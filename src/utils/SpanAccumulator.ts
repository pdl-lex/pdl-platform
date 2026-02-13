import _ from "lodash"
import AnnotatedTextdata, {
  BaseSpan,
  ContainerSpan,
  TextFormatSpan,
} from "../domain/AnnotatedTextData"
import { ContainerSegment, DisplaySegment } from "../domain/DisplaySegment"

function segmentTextAt(text: string, indexes: number[]): TextFormatSpan[] {
  return _.zipWith(indexes.slice(0, -1), indexes.slice(1), (start, end) => ({
    start,
    end,
    type: "text" as const,
    text: text.slice(start, end),
    labels: [],
  }))
}

function overlap(
  a: Pick<BaseSpan, "start" | "end">,
  b: Pick<BaseSpan, "start" | "end">,
): boolean {
  return a.start < b.end && a.end > b.start
}

class SpanAccumulator {
  text: string
  textSpans: TextFormatSpan[]
  containerSpans: ContainerSpan[]
  segments: TextFormatSpan[]

  constructor(data: AnnotatedTextdata) {
    const [textSpans, containers] = _.partition(
      data.annotations,
      (span) => span.type === "text",
    )
    this.textSpans = textSpans
    this.containerSpans = containers

    this.text = data.text
    this.segments = this.initSegments()
  }

  get spans() {
    return [...this.textSpans, ...this.containerSpans]
  }

  initSegments(): TextFormatSpan[] {
    const boundaries = _(this.spans)
      .flatMap(({ start, end }) => [start, end])
      .uniq()
      .push(0, this.text.length)
      .sortBy()
      .value()
    return segmentTextAt(this.text, boundaries)
  }

  injectLabels(span: TextFormatSpan) {
    for (const [index, segment] of this.segments.entries()) {
      if (span.labels && overlap(span, segment)) {
        const currentLabels = this.segments[index].labels
        this.segments[index].labels = _.uniq([...currentLabels, ...span.labels])
      }
      if (span.end === segment.end) {
        break
      }
    }
  }

  processContainer(
    container: ContainerSpan,
    content: TextFormatSpan[],
  ): ContainerSegment {
    if (container.type === "bibref") {
      return {
        ...container,
        content: [...content],
        fullReference: createDisplaySegments(container.fullReference),
      }
    }
    return { ...container, content: [...content] }
  }

  wrapSegments(containers: ContainerSpan[]): DisplaySegment[] {
    const segments: DisplaySegment[] = []
    const contentBuffer: TextFormatSpan[] = []

    this.segments.forEach((segment) => {
      const container = _.head(
        containers.filter((container) => overlap(container, segment)),
      )
      if (container) {
        contentBuffer.push(segment)

        if (container.end === segment.end) {
          segments.push(this.processContainer(container, contentBuffer))
          contentBuffer.length = 0 // clear buffer
        }
      } else {
        segments.push(segment)
      }
    })
    return segments
  }

  accumulate(): DisplaySegment[] {
    this.textSpans.forEach((span) => this.injectLabels(span))
    return this.wrapSegments(this.containerSpans)
  }
}

export function createDisplaySegments(
  data: AnnotatedTextdata,
): DisplaySegment[] {
  const acc = new SpanAccumulator(data)
  return acc.accumulate()
}

import { Link } from "react-router-dom"

import { Popover, Tooltip, UnstyledButton, Text } from "@mantine/core"
import {
  BibReferenceSegment,
  CrossReferenceSegment,
  DisplaySegment,
  LinkSegment,
  TextSegment,
} from "../domain/DisplaySegment"
import classNames from "classnames"
import "./AnnotatedText.sass"
import AnnotatedTextdata from "../domain/AnnotatedTextData"
import { createDisplaySegments } from "../utils/SpanAccumulator"

function DisplayPlainText({ segment }: { segment: TextSegment }) {
  const body = segment.labels?.includes("superscript") ? (
    <sup>{segment.text}</sup>
  ) : (
    <>{segment.text}</>
  )
  return <span className={classNames(segment.labels)}>{body}</span>
}

function DisplayLink({ segment }: { segment: LinkSegment }) {
  return <Link to={segment.target}>{segment.text}</Link>
}

function DisplayCrossReference({
  segment,
}: {
  segment: CrossReferenceSegment
}) {
  return segment.missing ? (
    <Tooltip label={"Eintrag fehlt"}>
      <Text
        span
        className={classNames(segment.type, segment.variant, "missing")}
        c="dimmed"
      >
        <RenderSegments segments={segment.content} />
      </Text>
    </Tooltip>
  ) : (
    <Link to={`${segment.target}`} className={classNames(segment.variant)}>
      <RenderSegments segments={segment.content} />
    </Link>
  )
}

function DisplayBibReference({ segment }: { segment: BibReferenceSegment }) {
  return (
    <Popover width={400} position="top" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton className={classNames(segment.type)}>
          <RenderSegments segments={segment.content} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <RenderSegments segments={segment.fullReference} />
      </Popover.Dropdown>
    </Popover>
  )
}

function RenderSegment({ segment }: { segment: DisplaySegment }) {
  switch (segment.type) {
    case "text":
      return <DisplayPlainText segment={segment} />
    case "link":
      return <DisplayLink segment={segment} />
    case "crossref":
      return <DisplayCrossReference segment={segment} />
    case "bibref":
      return <DisplayBibReference segment={segment} />
    default:
      return "??"
  }
}

function RenderSegments({ segments }: { segments: DisplaySegment[] }) {
  return (
    <>
      {segments.map((segment, index) => (
        <RenderSegment segment={segment} key={index} />
      ))}
    </>
  )
}

export default function DisplayAnnotatedText({
  data,
}: {
  data: AnnotatedTextdata
}) {
  return (
    <span>
      <RenderSegments segments={createDisplaySegments(data)} />
    </span>
  )
}

import { Link } from "react-router-dom"
import {
  BibReferenceSegment,
  CrossReferenceSegment,
  EmphasisSegment,
  LinkSegment,
  PlainTextSegment,
  RichText,
  SuperscriptSegment,
} from "../domain/RichText"
import { Tooltip, Text } from "@mantine/core"

function DisplayPlainText({ segment }: { segment: PlainTextSegment }) {
  return <>{segment.body}</>
}
function DisplayEmphasizedText({ segment }: { segment: EmphasisSegment }) {
  return (
    <Text span fs="italic">
      {segment.body}
    </Text>
  )
}
function DisplaySuperscript({ segment }: { segment: SuperscriptSegment }) {
  return <sup>{segment.body}</sup>
}

function DisplayLink({ segment }: { segment: LinkSegment }) {
  return <Link to={segment.url}>{segment.text}</Link>
}

function DisplayCrossReference({
  segment,
}: {
  segment: CrossReferenceSegment
}) {
  return (
    <Link to={`/entry/${encodeURIComponent(segment.targetId)}`}>
      {segment.text}
    </Link>
  )
}

function DisplayBibReference({ segment }: { segment: BibReferenceSegment }) {
  const label = <DisplayRichText text={segment.details} />
  return (
    <Tooltip label={label}>
      <Text
        style={{
          textDecoration: "underline",
          textDecorationStyle: "dotted",
          cursor: "help",
        }}
        span
      >
        {segment.text}
      </Text>
    </Tooltip>
  )
}

export default function DisplayRichText({ text }: { text: RichText }) {
  return (
    <div>
      {text.map((segment, index) => {
        switch (segment.type) {
          case "text":
            return <DisplayPlainText key={index} segment={segment} />
          case "emph":
            return <DisplayEmphasizedText key={index} segment={segment} />
          case "sup":
            return <DisplaySuperscript key={index} segment={segment} />
          case "link":
            return <DisplayLink key={index} segment={segment} />
          case "crossref":
            return <DisplayCrossReference key={index} segment={segment} />
          case "bibref":
            return <DisplayBibReference key={index} segment={segment} />
          default:
            return "??"
        }
      })}
    </div>
  )
}

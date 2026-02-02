import { Link } from "react-router-dom"

import { Popover, UnstyledButton } from "@mantine/core"
import {
  AnnotatedText,
  BibReferenceSegment,
  CrossReferenceSegment,
  LinkSegment,
  TextSegment,
} from "../domain/AnnotatedText"
import classNames from "classnames"
import "./AnnotatedText.sass"


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
  return (
    <Link
      to={`/entry/${encodeURIComponent(segment.target)}`}
      className={classNames(segment.variant)}
    >
      <DisplayAnnotatedText annotatedText={segment} />
    </Link>
  )
}

function DisplayBibReference({ segment }: { segment: BibReferenceSegment }) {
  return (
    <Popover width={400} position="top" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton className={classNames("bibref")}>
          <DisplayAnnotatedText annotatedText={segment} />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <DisplayAnnotatedText annotatedText={segment.fullReference} />
      </Popover.Dropdown>
    </Popover>
  )
}

export default function DisplayAnnotatedText({
  annotatedText,
}: {
  annotatedText: AnnotatedText
}) {
  return (
    <span>
      {annotatedText.content.map((segment, index) => {
        switch (segment.type) {
          case "text":
            return <DisplayPlainText key={index} segment={segment} />
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
    </span>
  )
}

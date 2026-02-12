import {
  Collapse,
  List,
  Blockquote,
  Text,
  Divider,
  ActionIcon,
  Tooltip,
  Spoiler,
} from "@mantine/core"
import classNames from "classnames"
import React, { JSX } from "react"
import { Sense } from "../domain/Entry"
import classes from "./DisplaySense.module.sass"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageMinus, IconMessagePlus } from "@tabler/icons-react"

function Examples({
  examples,
  opened,
}: {
  examples: { quote: string }[]
  opened: boolean
}) {
  return (
    <Collapse in={opened}>
      <Blockquote
        color={"lightgray"}
        radius={"xs"}
        p={"xs"}
        mt={"xs"}
        mb={"lg"}
      >
        {examples.map((example, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Divider my={"xs"} />}
            <Text p="0" m="0" fs="italic" size="sm" key={index}>
              {example.quote}
            </Text>
          </React.Fragment>
        ))}
      </Blockquote>
    </Collapse>
  )
}

function SenseItem({
  sense,
  index,
  showExamples,
  depth,
}: {
  sense: Sense
  index: number
  showExamples: boolean
  depth: number
}) {
  const examples =
    sense.cit?.filter(
      (c) => c.type === "example" && c.quote && c.quote.trim() !== "",
    ) || []
  const [opened, { toggle }] = useDisclosure(showExamples)
  const Icon = opened ? IconMessageMinus : IconMessagePlus

  const ToggleExamplesButton = (
    <Tooltip label={opened ? "Belege verbergen" : "Belege anzeigen"}>
      <ActionIcon variant="transparent" onClick={toggle}>
        <Icon size={"1em"} stroke={1.2} color="var(--lexoterm-gray-color)" />
      </ActionIcon>
    </Tooltip>
  )

  return (
    <List.Item
      key={index}
      className={classNames({
        [classes.numbered_sense_item]: !!sense.n,
      })}
      data-sense-n={`${sense.n}.`}
    >
      <Text span>
        {sense.def}
        {examples.length > 0 && ToggleExamplesButton}
      </Text>
      {examples.length > 0 && <Examples examples={examples} opened={opened} />}
      {!!sense.sense && (
        <DisplaySense
          senses={sense.sense}
          showExamples={showExamples}
          depth={depth + 1}
        />
      )}
    </List.Item>
  )
}

export default function DisplaySense({
  senses,
  showExamples = false,
  maxSensesToShow,
  depth = 1,
}: {
  senses: Sense[]
  showExamples?: boolean
  maxSensesToShow?: number
  depth?: number
}): JSX.Element {
  const SenseList = (
    <List
      className={classes.sense_list}
      style={{
        marginLeft: `calc(-0.4em * ${depth})`,
        paddingLeft: `calc(1.6em + 0.5em * ${depth})`,
      }}
    >
      {senses?.map((sense, index) => (
        <SenseItem
          key={index}
          sense={sense}
          index={index}
          showExamples={showExamples}
          depth={depth}
        />
      ))}
    </List>
  )

  return maxSensesToShow && senses.length > maxSensesToShow ? (
    <Spoiler
      maxHeight={320}
      showLabel={`Alle ${senses.length} Bedeutungen anzeigen`}
      hideLabel="Weniger anzeigen"
    >
      {SenseList}
    </Spoiler>
  ) : (
    <>{SenseList}</>
  )
}

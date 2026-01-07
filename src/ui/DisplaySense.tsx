import {
  Collapse,
  List,
  Stack,
  Blockquote,
  Text,
  Divider,
  ActionIcon,
  Tooltip,
} from "@mantine/core"
import classNames from "classnames"
import React, { JSX } from "react"
import { Sense } from "../domain/Entry"
import classes from "./DisplaySense.module.css"
import { useDisclosure } from "@mantine/hooks"
import { IconMessageMinus, IconMessagePlus } from "@tabler/icons-react"

function Examples({
  examples,
  opened,
}: {
  examples: { quote: string }[]
  opened: boolean
}) {
  if (examples.length === 0) {
    return <></>
  }
  return (
    <Stack align="flex-start">
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
    </Stack>
  )
}

function SenseItem({
  sense,
  index,
  showExamples,
}: {
  sense: Sense
  index: number
  showExamples: boolean
}) {
  const examples = sense.cit?.filter((c) => c.type === "example") || []
  const [opened, { toggle }] = useDisclosure(showExamples)
  const Icon = opened ? IconMessageMinus : IconMessagePlus

  const ToggleExamplesButton = (
    <Tooltip label={opened ? "Belege verbergen" : "Belege anzeigen"}>
      <ActionIcon variant="transparent" onClick={toggle}>
        <Icon size={"1em"} />
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
      <Examples examples={examples} opened={opened} />
      <DisplaySense senses={sense.sense} showExamples={showExamples} />
    </List.Item>
  )
}

export default function DisplaySense({
  senses,
  showExamples,
}: {
  senses?: Sense[]
  showExamples: boolean
}): JSX.Element {
  return senses && senses.length > 0 ? (
    <List>
      {senses.map((sense, index) => (
        <SenseItem
          key={index}
          sense={sense}
          index={index}
          showExamples={showExamples}
        />
      ))}
    </List>
  ) : (
    <></>
  )
}

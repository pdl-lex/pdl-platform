import { List } from "@mantine/core"
import classNames from "classnames"
import { JSX } from "react"
import { Sense } from "../domain/Entry"
import classes from "./DisplaySense.module.css"

export default function DisplaySense({
  senses,
}: {
  senses?: Sense[]
}): JSX.Element {
  return senses && senses.length > 0 ? (
    <List>
      {senses.map((sense, index) => (
        <List.Item
          key={index}
          className={classNames({
            [classes.numbered_sense_item]: !!sense.n,
          })}
          data-sense-n={`${sense.n}.`}
        >
          <span>{sense.def}</span>
          {<DisplaySense senses={sense.sense} />}
        </List.Item>
      ))}
    </List>
  ) : (
    <></>
  )
}

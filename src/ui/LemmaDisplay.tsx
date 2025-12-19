import _ from "lodash"
import { JSX } from "react"
import Entry, { Form, Sense } from "../domain/Entry"
import { Title, Text, List } from "@mantine/core"
import { useParams } from "react-router-dom"
import classes from "./LemmaDisplay.module.css"
import classNames from "classnames"

type Gender = "M" | "W" | "N"

function DisplaySense({ senses }: { senses?: Sense[] }): JSX.Element {
  return senses ? (
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

export function LemmaNotFound(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  return (
    <section>
      <Text>Lemma "{id}" nicht gefunden.</Text>
    </section>
  )
}

function DisplayGender({ gender }: { gender: Gender }): JSX.Element {
  const articles = {
    M: "der",
    W: "die",
    N: "das",
  }
  return <span className={classes.gender}>{`, ${articles[gender]}`}</span>
}

function DisplayVariants({ variants }: { variants: Form[] }): JSX.Element {
  return (
    <>
      <Title order={2} size={"h4"} pb=".5em">
        Varianten
      </Title>
      <List>
        {variants.map((variant, index) => (
          <List.Item key={index}>{variant.orth}</List.Item>
        ))}
      </List>
    </>
  )
}

export default function DisplayEntry({ entry }: { entry: Entry }): JSX.Element {
  const headword = _.first(entry.form)?.orth
  const pos = entry.getFeature("pos") || "-"
  const gender = entry.getFeature("gender") || ""
  const variants = entry.getVariants()

  return (
    <section>
      <Title size={"h2"}>
        {headword}
        {gender && <DisplayGender gender={gender as Gender} />}
      </Title>
      <Text pb="1.5em">
        <span>{pos}</span>
      </Text>
      {variants.length > 0 && <DisplayVariants variants={variants} />}
      <Title order={2} size={"h4"} pb=".5em">
        Bedeutungen
      </Title>
      <DisplaySense senses={entry.sense} />
    </section>
  )
}

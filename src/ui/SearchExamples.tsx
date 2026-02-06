import { Alert, Typography } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export default function SearchExamples() {
  const icon = <IconInfoCircle />
  return (
    <Alert
      mt={0}
      variant="light"
      color="blue"
      title="Hinweise zur Suche"
      icon={icon}
    >
      <Typography>
        <ul>
          <li>
            <strong>Freie Suche</strong>: Unscharfe Volltext- und Phrasensuche (
            <em>fuzzy search</em>) auf dem gesamten Datenbestand, z.B.:
            <ul>
              <li>
                <Link to={"?q=Gruß"} target="_blank" rel="noopener noreferrer">
                  Freie Suche nach “Gruß”
                </Link>
              </li>
              <li>
                <Link
                  to={'?q="in+Redensart"'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suche nach der Phrase “in Redensart”
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <strong>Lemma</strong>: Sowohl exakte Lemmata als auch Suche mit
            regulären Ausdrücken
            <ul>
              <li>
                <Link
                  to={"?lemma=Tier"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suche nach dem Lemma “Tier” (exakt)
                </Link>
              </li>
              <li>
                <Link
                  to={"?lemma=/tier/i"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Suche nach Lemmata, die die Zeichenfolge “tier” enthalten
                </Link>{" "}
                per regulärem Ausdruck <code>/tier/i</code>
              </li>
            </ul>
          </li>
          <li>
            <strong>Wörterbücher</strong>: Auswahl der einzuschließenden
            Quellwörterbücher, z.B. zur{" "}
            <Link
              to={"?resources=bwb"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Suche nur im Bayerischen Wörterbuch
            </Link>
          </li>
          <li>
            <strong>Wortart</strong>: Einschränkung auf bestimmte Wortarten
            <ul>
              <li>
                <strong>Normalisiert</strong>: Filtern nach vereinheitlichten
                Wortarten, z.B.{" "}
                <Link
                  to={"?npos=Verb"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verben
                </Link>
              </li>
              <li>
                <strong>Original</strong>: Filtern nach ursprünglich in den
                Quellwörterbüchern verwendeten, spezialisierten Wortarten wie{" "}
                <Link
                  to={"?pos=Tierzuruf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  “Tierzuruf”
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Die Suchfelder können beliebig kombiniert werden, z.B. um{" "}
          <Link
            to={`?lemma=${encodeURIComponent(
              "/^[A-Z].+/",
            )}&npos=Verb&resources=wbf`}
            target="_blank"
            rel="noopener noreferrer"
          >
            das Fränkische Wörterbuch nach verbalen Lemmata, die mit einem
            Großbuchstaben beginnen
          </Link>{" "}
          zu durchsuchen.
        </p>
      </Typography>
    </Alert>
  )
}

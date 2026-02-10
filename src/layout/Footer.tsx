import { Box, MantineSpacing, SimpleGrid, StyleProp } from "@mantine/core"
import { FooterColumn } from "./FooterColumn"
import BadwLogo from "../domain/BadwLogo"

export default function Footer({
  outerSpacing,
  mainMaxWidth,
}: {
  outerSpacing: StyleProp<MantineSpacing>
  mainMaxWidth: StyleProp<MantineSpacing>
}) {
  return (
    <Box maw={"100%"} bg={"lexoterm-footer"} m={outerSpacing}>
      <SimpleGrid
        maw={mainMaxWidth}
        mx={"auto"}
        cols={{ base: 2, sm: 5 }}
        p={"lg"}
      >
        <Box>
          <FooterColumn>
            <BadwLogo />
          </FooterColumn>
        </Box>
        <Box>
          <FooterColumn>
            <FooterColumn.Title>LexoTerm</FooterColumn.Title>
            <FooterColumn.Content>
              <p>
                Die lexikographische und korpuslinguistische Plattform des
                Projekts “Neue Potenziale für die Digitale Lexikographie des
                Deutschen” (PDL).
              </p>
              <p>Ein Angebot der Bayerischen Akademie der Wissenschaften.</p>
              <p>© 2025-2026. Alle Rechte vorbehalten.</p>
            </FooterColumn.Content>
          </FooterColumn>
        </Box>
        <Box>
          <FooterColumn>
            <FooterColumn.Title>Kontakt</FooterColumn.Title>
            <FooterColumn.Content>
              <p>
                Mail:{" "}
                <a href="mailto:kontakt@pdl.badw.de">kontakt@pdl.badw.de</a>
                <br />
                PDL-Webseite:{" "}
                <a
                  href="https://pdl.badw.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pdl.badw.de
                </a>
                <br />
                Telefon: <a href="tel:089230311375">089 23031-1375</a>
              </p>
              <p>
                <address style={{ fontStyle: "normal" }}>
                  Bayerische Akademie der Wissenschaften
                  <br />
                  Alfons-Goppel-Straße 11
                  <br />
                  80539 München
                </address>
              </p>
            </FooterColumn.Content>
          </FooterColumn>
        </Box>
        <Box>
          <FooterColumn>
            <FooterColumn.Title>Informationen</FooterColumn.Title>
            <FooterColumn.Content>
              <p>Team</p>
              <p>Häufig gestellte Fragen (FAQ)</p>
              <p>Informationen zum Projekt</p>
              <p>BAdW</p>
              <p>Akademienunion</p>
            </FooterColumn.Content>
          </FooterColumn>
        </Box>
        <Box>
          <FooterColumn>
            <FooterColumn.Title>Rechtliches</FooterColumn.Title>
            <FooterColumn.Content>
              <p>Impressum</p>
              <p>Nutzung/Lizenzen</p>
              <p>Datenschutzerklärung</p>
            </FooterColumn.Content>
          </FooterColumn>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

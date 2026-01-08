import {
  Badge,
  Card,
  Grid,
  Title,
  Text,
  Flex,
  Stack,
  Center,
} from "@mantine/core"
import MainText from "../layout/MainText"
import { Link } from "react-router-dom"
import { IconExternalLink } from "@tabler/icons-react"

interface ResourceInfo {
  label: string
  color: string
  displayName: string
  body?: string
  url?: string
  tags?: string[]
}

const resourceInfos: ResourceInfo[] = [
  {
    label: "BWB",
    color: "blue",
    displayName: "Bayerisches Wörterbuch",
    body: "Das Bayerische Wörterbuch erforscht und dokumentiert den gesamten bairischen Wortschatz aus Oberbayern, Niederbayern, der Oberpfalz und den angrenzenden bairischen Gebieten Bayerisch-Schwabens sowie Mittel- und Oberfrankens.",
    url: "https://bwb.badw.de/das-projekt.html",
  },
  {
    label: "DIBS",
    color: "yellow",
    displayName: "Dialektologisches Informationssystem von Bayerisch-Schwaben",
    body: "Der Kern von DIBS ist das gesamte im Rahmen dieses Projekts gesammelte, verstichwortete, grammatikalisch und semantisch kategorisierte Belegmaterial zum Dialektwortschatz in Bayerisch-Schwaben, sowie alle weiteren z.B. volks- oder sachkundlichen Informationen zu diesem Material.",
    url: "https://dibs.badw.de/dibs-digital.html",
  },
  {
    label: "WBF",
    color: "red",
    displayName: "Fränkisches Wörterbuch",
    body: "Das Fränkische Wörterbuch (WBF) ist ein Projekt der Bayerischen Akademie der Wissenschaften. Seit 2012 ist es an der Friedrich-Alexander-Universität Erlangen-Nürnberg angesiedelt. Es steht unter der Leitung von Frau Prof. Dr. Mechthild Habermann, der Inhaberin des Lehrstuhls für Germanistische Sprachwissenschaft.",
    url: "https://wbf.badw.de/das-projekt.html",
  },
  {
    label: "DWDS",
    color: "#337ab7",
    displayName: "Digitales Wörterbuch der deutschen Sprache",
    body: "Ziel des an der Berlin-Brandenburgischen Akademie der Wissenschaften beheimateten Vorhabens ist die Schaffung eines „Digitalen Lexikalischen Systems“ – eines umfassenden, Benutzerinnen und Benutzern über das Internet zugänglichen Wortinformationssystems, das Auskunft über den deutschen Wortschatz in Vergangenheit und Gegenwart gibt.",
    url: "https://www.dwds.de/",
  },
]

function ResourceCard({ resource }: { resource: ResourceInfo }) {
  return (
    <Card withBorder shadow="md" h={"100%"}>
      <Badge variant="light" size="xs" color={resource.color}>
        {resource.label.toUpperCase()}
      </Badge>
      <Title order={4} mt="xs">
        {resource.displayName}
      </Title>
      <Stack justify="space-between" h="100%">
        <Text style={{ hyphens: "auto" }}>{resource.body || ""}</Text>
        {resource.url && (
          <Flex justify="flex-end">
            <Link to={resource.url} target="_blank" rel="noopener noreferrer">
              Mehr erfahren <IconExternalLink size={14} />
            </Link>
          </Flex>
        )}
      </Stack>
    </Card>
  )
}

export default function Dictionaries() {
  return (
    <MainText>
      <Center mb="xl">
        <Title>Wörterbücher im ADL</Title>
      </Center>
      <Grid>
        {resourceInfos.map((resource) => (
          <Grid.Col span={{ base: 12, xs: 6 }} key={resource.label}>
            <ResourceCard resource={resource} />
          </Grid.Col>
        ))}
      </Grid>
    </MainText>
  )
}

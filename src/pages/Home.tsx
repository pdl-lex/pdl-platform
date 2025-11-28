import { BackgroundImage, Box, Container, Title, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import LemmaSearchForm from "../ui/LemmaSearchForm"

export default function Home() {
  return (
    <Container miw="100%" p="0">
      <BackgroundImage src="/background.jpg" mih="50vh" p="xl">
        <Title style={{ color: "white", lineHeight: 1.2 }} py="sm">
          Akademien&shy;zentrum
          <br />
          digitale Lexikographie des Deutschen
        </Title>
        <Text fw="800" style={{ color: "white" }} pb="xl">
          Forschen • Entwickeln • Vernetzen
        </Text>
        <LemmaSearchForm gap="xs" maw="24em" />
      </BackgroundImage>
      <Box maw="800px" mx="auto" py="xl" px="md">
        <Title order={2} pb="lg">
          Über das ADL
        </Title>
        <Text pb="md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          deserunt animi dolorum eos autem facere soluta fuga id distinctio et
          eveniet nostrum, quidem ea quae quisquam molestiae sint accusamus
          harum.
        </Text>
        <Text pb="md">
          Nostrum, minus pariatur recusandae, ea necessitatibus architecto
          perferendis corrupti fugiat libero consequatur deleniti quos odio
          eveniet nam voluptate ipsa hic, eaque quidem. Voluptatum iure
          assumenda aliquam ipsam in esse explicabo.
        </Text>
        <Text pb="md">
          Dignissimos eveniet sed suscipit quaerat excepturi alias aut velit
          laudantium similique quidem enim, officia eaque quibusdam totam
          perferendis fuga error unde consequuntur, illo ullam aspernatur nihil?
          Id perferendis impedit dolorem.
        </Text>
        <Link to="/about">Mehr erfahren</Link>
      </Box>
    </Container>
  )
}

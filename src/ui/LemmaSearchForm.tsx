import { ActionIcon, Group, TextInput, GroupProps } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function LemmaSearchForm({ ...props }: GroupProps) {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState("")

  const SearchButton = (
    <ActionIcon variant="transparent" size="lg" type="submit">
      <IconSearch size={16} />
    </ActionIcon>
  )

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/entry/${encodeURIComponent(searchValue.trim())}`)
    }
  }

  return (
    <Group component={"form"} onSubmit={handleSubmit} {...props}>
      <TextInput
        rightSection={SearchButton}
        flex={1}
        placeholder="Stichwortsuche..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
    </Group>
  )
}

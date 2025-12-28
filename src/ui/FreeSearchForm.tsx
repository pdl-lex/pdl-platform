import {
  ActionIcon,
  Group,
  TextInput,
  GroupProps,
  CloseButton,
} from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useRef, useState } from "react"

export default function FreeSearchForm({ ...props }: GroupProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const currentQuery = searchParams.get("q") || ""

  const [searchValue, setSearchValue] = useState(currentQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  const SearchButton = (
    <ActionIcon.Group style={{ alignItems: "center" }}>
      {searchValue && (
        <CloseButton
          variant="transparent"
          size="sm"
          onClick={() => {
            setSearchValue("")
            inputRef.current?.focus()
          }}
        />
      )}
      <ActionIcon variant="transparent" size="lg" type="submit">
        <IconSearch size={16} />
      </ActionIcon>
    </ActionIcon.Group>
  )

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!searchValue.trim()) {
      navigate(`/search`)
    }
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`)
  }

  return (
    <Group component={"form"} onSubmit={handleSubmit} {...props}>
      <TextInput
        ref={inputRef}
        autoFocus
        rightSection={SearchButton}
        rightSectionProps={{
          style: { justifyContent: "flex-end" },
        }}
        flex={1}
        placeholder="Freie Suche..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
    </Group>
  )
}

import { Box, MantineSpacing, SimpleGrid, StyleProp } from "@mantine/core"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import { FooterColumn } from "./FooterColumn"
import BadwLogo from "../domain/BadwLogo"
import { useCmsGlobal } from "../hooks/useCms"
import CmsRichText from "../ui/CmsRichText"

type FooterCmsColumn = {
  id?: string
  title?: string | null
  content?: SerializedEditorState | string | null
}

type FooterGlobalResponse = {
  footerColumns?: FooterCmsColumn[] | null
}

function isSerializedEditorState(
  value: unknown,
): value is SerializedEditorState {
  return Boolean(value && typeof value === "object" && "root" in value)
}

export default function Footer({
  outerSpacing,
  mainMaxWidth,
}: {
  outerSpacing: StyleProp<MantineSpacing>
  mainMaxWidth: StyleProp<MantineSpacing>
}) {
  const { data, isLoading, error } = useCmsGlobal<FooterGlobalResponse>(
    "footer",
    {
      fetchOptions: { depth: 2, draft: false },
    },
  )

  const cmsColumns = data?.footerColumns ?? []

  return (
    <Box
      maw={"100%"}
      bg={"lexoterm-footer"}
      m={outerSpacing}
      component={"footer"}
    >
      <SimpleGrid
        maw={mainMaxWidth}
        mx={"auto"}
        cols={{ base: 1, sm: 5 }}
        p={"lg"}
      >
        <Box>
          <FooterColumn pb={"xl"}>
            <BadwLogo />
          </FooterColumn>
        </Box>

        {!isLoading &&
          !error &&
          cmsColumns.length > 0 &&
          cmsColumns.map((column, index) => (
            <Box key={column.id ?? String(index)}>
              <FooterColumn>
                {column.title ? (
                  <FooterColumn.Title>{column.title}</FooterColumn.Title>
                ) : null}
                <FooterColumn.Content>
                  {isSerializedEditorState(column.content) ? (
                    <CmsRichText data={column.content} />
                  ) : typeof column.content === "string" &&
                    column.content.trim() ? (
                    <p>{column.content}</p>
                  ) : null}
                </FooterColumn.Content>
              </FooterColumn>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  )
}

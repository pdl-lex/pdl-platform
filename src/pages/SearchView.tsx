import MainText from "../layout/MainText"
import FreeSearchForm from "../ui/FreeSearchForm"
import SearchResult from "../ui/SearchResult"

export default function SearchView() {
  return (
    <MainText>
      <FreeSearchForm />
      <SearchResult />
    </MainText>
  )
}

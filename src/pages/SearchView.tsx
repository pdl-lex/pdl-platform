import MainText from "../layout/MainText"
import ComplexSearchForm from "../ui/ComplexSearchForm"
import SearchResult from "../ui/SearchResult"

export default function SearchView() {
  return (
    <MainText>
      <ComplexSearchForm />
      <SearchResult />
    </MainText>
  )
}

export const ITEMS_SEARCH_QUERY = gql`
  query ItemsSearch($search: String!) {
    itemsSearch(search: $search) {
      id
      name
    }
  }
`

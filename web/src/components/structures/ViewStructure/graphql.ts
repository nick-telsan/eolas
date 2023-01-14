export const CREATE_OR_UPDATE_ITEM = gql`
  mutation CreateOrUpdateItemMutation($input: CreateOrUpdateItemInput!) {
    createOrUpdateItem(input: $input) {
      id
    }
  }
`

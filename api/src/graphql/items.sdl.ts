export const schema = gql`
  type Item {
    id: Int!
    name: String
    body: String
    philosophy: String
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int): Item @requireAuth
  }

  input ItemInput {
    id: Int!
    name: String
    body: String
    philosophy: String
  }

  input CreateOrUpdateItemInput {
    id: Int
    name: String
    body: String
    philosophy: String
  }

  type Mutation {
    createItem(input: ItemInput!): Item! @requireAuth
    updateItem(input: ItemInput!): Item! @requireAuth
    createOrUpdateItem(input: CreateOrUpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`

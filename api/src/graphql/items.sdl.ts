export const schema = gql`
  type Item {
    id: Int!
    name: String
    body: String
    philosophy: String
    parentId: Int
    parent: Item
    children: [Item]
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int): Item @requireAuth
    itemsByName(name: String!): [Item] @requireAuth
    itemsSearch(search: String!): [Item] @requireAuth
  }

  input ItemInput {
    id: Int!
    name: String
    body: String
    philosophy: String
    parentId: Int
  }

  input CreateOrUpdateItemInput {
    id: Int
    name: String
    body: String
    philosophy: String
    parentId: Int
  }

  type Mutation {
    createItem(input: ItemInput!): Item! @requireAuth
    updateItem(input: ItemInput!): Item! @requireAuth
    createOrUpdateItem(input: CreateOrUpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`

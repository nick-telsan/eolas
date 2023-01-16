export const schema = gql`
  type Item {
    id: Int!
    name: String
    body: String
    philosophy: String
    parentId: Int
    parent: Item
    children: [Item]
    position: Int
  }

  type Query {
    items: [Item!]! @requireAuth
    item(id: Int): Item @requireAuth
    itemsByName(name: String!, id: Int): [Item] @requireAuth
    itemsSearch(search: String!): [Item] @requireAuth
    compareItems(items: [Int!]): [Item] @requireAuth
  }

  input ItemInput {
    id: Int!
    name: String
    body: String
    philosophy: String
    parentId: Int
    position: Int
  }

  input CreateOrUpdateItemInput {
    id: Int
    name: String
    body: String
    philosophy: String
    parentId: Int
    position: Int
  }

  type Mutation {
    createItem(input: ItemInput!): Item! @requireAuth
    updateItem(input: ItemInput!): Item! @requireAuth
    createOrUpdateItem(input: CreateOrUpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`

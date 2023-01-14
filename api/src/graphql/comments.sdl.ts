export const schema = gql`
  type Comment {
    id: String!
    userId: Int!
    itemId: Int!
    body: String
    createdAt: DateTime!
    user: User!
    item: Item!
  }

  type Query {
    comments: [Comment!]! @requireAuth
    comment(id: String!): Comment @requireAuth
    commentsByItem(itemId: Int): [Comment] @requireAuth
  }

  input CreateCommentInput {
    userId: Int!
    itemId: Int!
    body: String
  }

  input UpdateCommentInput {
    userId: Int
    itemId: Int
    body: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: String!, input: UpdateCommentInput!): Comment!
      @requireAuth
    deleteComment(id: String!): Comment! @requireAuth
  }
`

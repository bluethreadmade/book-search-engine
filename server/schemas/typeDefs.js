// typedefs go here
const typeDefs = `
type: User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book]
}

type: Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type: Auth{ 
  token: ID
  user: User
}

type Query {
  me: User
}

type SaveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(input: SaveBookInput): User
  removeBook(bookId: String): User

  createProject(
    name: String!,
    materials: [String]!,
    instructions: [String]!,
    pricePoint: String!,
    difficulty: String!,
    craft: String!
    authorId: ID!
  ): Project
  deleteProject(id: ID!): Project

}
`;

/* EXPORT */
module.exports = typeDefs;

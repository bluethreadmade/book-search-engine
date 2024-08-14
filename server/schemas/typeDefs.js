// typedefs go here
const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth{ 
  token: ID
  user: User
}

type Query {
  me: User
  user(id: ID, username: String): User
}

input SaveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  saveBook(input: SaveBookInput): User
  deleteBook(bookId: String): User
}
`;

/* EXPORT */
module.exports = typeDefs;

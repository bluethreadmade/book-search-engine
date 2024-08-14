const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

const { ApolloServer } = require("@apollo/server");
// const { ApolloServer } = require("apollo-server-express");
// const { expressMiddleware } = require("apollo-server-express");


const typeDefs = require("./schemas/typeDefs.js"); 
const resolvers = require("./schemas/resolvers.js"); 

const { expressMiddleware } = require("@apollo/server/express4");

const authMiddleware = require("./utils/auth.js");

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );
};

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});

startApolloServer();

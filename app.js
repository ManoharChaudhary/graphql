const express = require("express");
const bodyParser = require("body-parser");
const graphqaHttp = require("express-graphql");
const mongoose = require("mongoose");
const app = express();
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqaHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-zkmcf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Connected successfully");
      }
    }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    throw new Error(err);
  });

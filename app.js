const express = require("express");
const bodyParser = require("body-parser");
const graphqaHttp = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");
const isAuth = require("./middleware/is-auth");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqaHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
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
    app.listen(8000);
  })
  .catch(err => {
    throw new Error(err);
  });

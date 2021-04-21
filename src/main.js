const express = require("express");
const bodyParser = require("body-parser");
const UserApi = require("./Routes/user.routes");
const PokemonApi = require("./Routes/pokemon.routes");
const history = require('connect-history-api-fallback');


const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/", express.static("public"));
app.use(
  history({
    verbose: true,
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
  })
);

app.use("/", express.static("public"));

app.use("/api/user",UserApi);

app.use("/api/pokemon",PokemonApi);




app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const recipes = JSON.parse(fs.readFileSync(path.join(__dirname, "recipes.json")));

app.use(express.static(path.join(__dirname, "public")));

app.get("/recipes", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const results = recipes.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: recipes.length,
    recipes: results,
  });
});

app.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
const express = require("express");
const cors = require("cors");
const { cards } = require("./mockData");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/api/cards", (req, res) => {
  let paginatedCards = null;
  let page = null;

  if (parseInt(req.query.page) === 0) {
    paginatedCards = cards;
    page = 0;
  } else {
    page = parseInt(req.query.page) || 1;

    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    paginatedCards = cards.slice(startIndex, endIndex);
  }

  const response = {
    cards: paginatedCards,
    totalLength: cards.length,
    currentPage: page,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

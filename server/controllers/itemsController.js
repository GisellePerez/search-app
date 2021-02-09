const self = {};

const fetch = require("isomorphic-fetch");

const baseUrl = "https://api.mercadolibre.com";
const author = {
  name: "Giselle",
  lastname: "Perez",
};

// Fetch list of items by query
self.fetchItems = async function (req, res, next) {
  // 1. Get query from frontend request
  const query = req.query.q;

  // 2. Request data from api based on query
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/sites/MLA/search?q=${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const data = await fetchData();

  // Return object with specified structure
  res.send({
    author: author,
    data: data,
  });
};

// Fetch items by id
self.fetchItemById = async function (req, res, next) {
  // 1. Get query from frontend request
  const queryId = req.query.id;

  // 2. Fetch item data by its id
  const fetchItemData = async () => {
    try {
      const response = await fetch(`${baseUrl}/items/MLA601795056`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const itemData = await fetchItemData();

  res.send({
    author: author,
    data: itemData,
  });
};

module.exports = self;

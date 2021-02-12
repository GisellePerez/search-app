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

  // Get categories based on items.category_id
  const getCategories = async (items) => {
    if (items && items.length > 0 && items[0].category_id) {
      const categoriesResponse = await fetch(
        `${baseUrl}/categories/${items[0].category_id}`
      );
      const categoryData = await categoriesResponse.json();

      return categoryData.path_from_root;
    }
  };

  // 2. Request data from api based on query received
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/sites/MLA/search?q=${query}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // 4. Format response to send to frontend
  const formatItem = (items) => {
    let formattedItems = [];

    if (items && items.length > 0) {
      formattedItems = items.map((item) => {
        if (item) {
          return {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price,
              decimals: item.price, // TODO: create decimals based on amount
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
          };
        }
      });
    }

    return formattedItems;
  };

  const rawData = await fetchData();

  // Return object with specified structure
  if (rawData.results.length > 0) {
    res.send({
      author: author,
      items: await formatItem(rawData.results),
      categories: await getCategories(rawData.results),
    });
  }
};

// Fetch item by id
self.fetchItemById = async function (req, res, next) {
  // 1. Get query from frontend request
  const queryId = req.params.id;
  const itemUrl = `${baseUrl}/items/${queryId}`;

  // 2. Fetch item data by its id
  const fetchItemData = async () => {
    try {
      const response = await fetch(itemUrl);
      const itemData = await response.json();

      return itemData;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchItemDescription = async () => {
    try {
      const descriptionResponse = await fetch(`${itemUrl}/description`);
      const description = await descriptionResponse.json();

      return description.plain_text;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const formatItemDetailData = async (item) => {
    const formatedDetail = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: item.price, // TODO: build decimals
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      description: await fetchItemDescription(),
    };

    return formatedDetail;
  };

  const itemData = await fetchItemData();

  res.send({
    author: author,
    item: await formatItemDetailData(itemData),
  });
};

module.exports = self;

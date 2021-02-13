const self = {};

const fetch = require("isomorphic-fetch");

const baseUrl = "https://api.mercadolibre.com";
const author = {
  name: "Giselle",
  lastname: "Perez",
};

// Function to format the price and the decimals
const formatPrice = (currency_id, price) => {
  let formattedPrice = {};

  if (price) {
    // Turn number into a string and then create an array to separate first part of the number from decimals
    const priceArray = ("" + price).split(".");

    // Assing first element of array to amount and second element to decimals
    formattedPrice.currency = currency_id;
    formattedPrice.amount = parseInt(priceArray[0]);
    formattedPrice.decimals = priceArray[1] ? parseInt(priceArray[1]) : 0;
  }

  return formattedPrice;
};

// Function to return only an array of strings for categories
const formatCategories = async (categories) => {
  if (categories && categories.length > 0) {
    return categories.map((category) => category.name);
  }
};

// Fetch list of items by query
self.fetchItems = async function (req, res, next) {
  // Get query from frontend request
  const query = req.query.q;

  // Function to fetch categories based on items.category_id
  const fetchCategories = async (items) => {
    if (items && items.length > 0 && items[0].category_id) {
      const categoriesResponse = await fetch(
        `${baseUrl}/categories/${items[0].category_id}`
      );
      const categoryData = await categoriesResponse.json();
      const formattedCategories = await formatCategories(
        categoryData.path_from_root
      );

      return formattedCategories;
    }
  };

  // Function to fetch data from api based on search query
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/sites/MLA/search?q=${query}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // Format response that will be sent to frontend
  const formatItem = async (items) => {
    let formattedItems = [];

    if (items && items.length > 0) {
      formattedItems = items.map((item) => {
        if (item) {
          return {
            id: item.id,
            title: item.title,
            price: formatPrice(item.currency_id, item.price),
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            address: {
              state_id: item.address.state_id,
              state_name: item.address.state_name,
              city_id: item.address.city_id,
              city_name: item.address.city_name,
            },
          };
        }
      });
    }

    return formattedItems;
  };

  const rawData = await fetchData();

  // Send response with requested format
  if (rawData.results.length > 0) {
    res.send({
      author: author,
      items: await formatItem(rawData.results),
      categories: await fetchCategories(rawData.results),
    });
  }
};

// Fetch item by id
self.fetchItemById = async function (req, res, next) {
  // Get query from frontend request
  const itemId = req.params.id;
  const itemUrl = `${baseUrl}/items/${itemId}`;

  let itemCategoryId = null;

  // Function to fetch item data by its id
  const fetchItemData = async () => {
    try {
      // First get response and parse it to json
      const response = await fetch(itemUrl);
      const itemData = await response.json();

      // Then get category_id and store it in a variable.
      // Will be used later when fetching the item's categories
      itemCategoryId = await itemData.category_id;

      // TODO: is it better to return en object with the raw data and the categories instead?
      return itemData;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // Function to fetch item desctription
  const fetchItemDescription = async () => {
    try {
      const descriptionResponse = await fetch(`${itemUrl}/description`);
      const description = await descriptionResponse.json();

      return description.plain_text;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  // Function to fetch item desctription
  const fetchItemCategories = async () => {
    try {
      const itemCategoriesResponse = await fetch(
        `${baseUrl}/categories/${itemCategoryId}`
      );
      const itemCategories = await itemCategoriesResponse.json();
      const formattedCategories = await formatCategories(
        itemCategories.path_from_root
      );

      return formattedCategories;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const translateCondition = async (condition) => {
    switch (condition) {
      case "new":
        return "Nuevo";

      case "used":
        return "Usado";

      default:
        return condition;
    }
  };

  // Function to format item response to send to frontend
  const formatItemDetailData = async (item) => {
    const formattedDetail = {
      id: item.id,
      title: item.title,
      price: formatPrice(item.currency_id, item.price),
      picture: item.thumbnail,
      condition: await translateCondition(item.condition),
      free_shipping: item.shipping.free_shipping,
      description: await fetchItemDescription(),
      categories: await fetchItemCategories(),
      sold_quantity: item.sold_quantity,
    };

    return formattedDetail;
  };

  const itemData = await fetchItemData();

  // Send response with requested format
  res.send({
    author: author,
    item: await formatItemDetailData(itemData),
  });
};

module.exports = self;

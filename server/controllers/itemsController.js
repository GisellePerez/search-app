const self = {};

const fetch = require("isomorphic-fetch");

const baseUrl = "https://api.mercadolibre.com";
const author = {
  name: "Giselle",
  lastname: "Perez",
};

/**
 *  Function to fetch currency symbol by id.
 *
 * @param   {string} currencyId item's currency id. E.g.: 'ARS'.
 * @returns {string} item's currency symbol. E.g.: '$'.
 */
const fetchCurrencySymbol = async (currencyId) => {
  const response = await fetch(`${baseUrl}/currencies/${currencyId}`);
  const currencyData = await response.json();

  return currencyData.symbol;
};

/**
 *  Function to format the price and the decimals. Calls function to fetch currency symbol by id.
 *
 * @param   {string} currencyId item's currency_id. E.g.: 'ARS'.
 * @param   {number} price number corresponding to price
 *
 * @returns {{currency: string; amount: number; decimals: number}} the number formatted accordingly
 */
const formatPrice = async (currencyId, price) => {
  let formattedPrice = {};

  if (price) {
    //** Turn number into a string and then create an array to separate first part of the number from decimals */
    const priceArray = ("" + price).split(".");

    //** Call function to fetch currency symbol by id  */
    formattedPrice.currency = await fetchCurrencySymbol(currencyId);
    //** Assing first element of priceArray to amount and second element to decimals */
    formattedPrice.amount = parseInt(priceArray[0]);
    formattedPrice.decimals = priceArray[1] ? parseInt(priceArray[1]) : 0;
  }

  return formattedPrice;
};

/**
 * Function to fetch category symbol by id
 *
 * @param   {{id: string; name: string;}} categories  Array of categories
 * @returns {string[]} Array of categories' names
 */
const formatCategories = async (categories) => {
  if (categories && categories.length > 0) {
    return categories.map((category) => category.name);
  }
};

/**
 * Fetch list of items by query
 *
 * @param   {any} req
 * @param   {any} res
 * @param   {any} next
 * @returns {{author: {name:string; lastname: string}; categories: string[], items: Item[]}} Array of categories' names
 */
self.fetchItems = async function (req, res, next) {
  /** Get query from frontend request */
  const query = req.query.q;

  /** Function to fetch categories by item's category_id
   *
   * @param   {Item[]} items array of items reurned by the api
   * @returns {string[]} categories formatted for frontend
   */
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

  /**
   * Function to fetch data from api based on search query
   *
   * @returns {FormattedItem[]} items formatted for frontend
   */
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseUrl}/sites/MLA/search?q=${query}`);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  /**
   * Format response that will be sent to frontend
   *
   * @param   {Item[]} items array of items reurned by the api
   * @returns {FormattedItem[]} items formatted for frontend
   */
  const formatItem = async (items) => {
    let formattedItems = [];

    if (items && items.length > 0) {
      formattedItems = await Promise.all(
        items.map(async (item) => {
          if (item) {
            return {
              id: item.id,
              title: item.title,
              price: await formatPrice(item.currency_id, item.price),
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
        })
      );
    }

    return formattedItems;
  };

  const rawData = await fetchData();

  //** Send response with requested format */
  if (rawData.results.length > 0) {
    res.send({
      author: author,
      items: await formatItem(rawData.results),
      categories: await fetchCategories(rawData.results),
    });
  }
};

/**
 * Function to fetch item by id
 *
 * @param   {any} req
 * @param   {any} res
 * @param   {any} next
 * @returns {FormattedItemDetailData} item with format requested for frontend
 */
self.fetchItemById = async function (req, res, next) {
  //** Get query from frontend request */
  const itemId = req.params.id;
  const itemUrl = `${baseUrl}/items/${itemId}`;

  let itemCategoryId = null;

  /**
   * Function to fetch item data by its id
   *
   * @returns {ItemDetailData} item's raw data from api
   */
  const fetchItemData = async () => {
    try {
      //** First get response and parse it to json */
      const response = await fetch(itemUrl);
      const itemData = await response.json();

      //**  Then get category_id and store it in a variable. */
      //**  It will be used later when fetching the item's categories */
      itemCategoryId = await itemData.category_id;

      return itemData;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  /**
   * Function to fetch item desctription
   *
   * @returns {string} item's description from api
   */
  const fetchItemDescription = async () => {
    try {
      const descriptionResponse = await fetch(`${itemUrl}/description`);
      const description = await descriptionResponse.json();

      return description.plain_text;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  /**
   * Function to fetch item's categories
   *
   * @returns {string[]} array of categories names (formatted for frontend)
   */
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

  /**
   * Function to return item's condition in Spanish by condition from api.
   *
   * @param   {string} condition condition from api in English. E.g.: 'new'
   * @returns {string} condition in Spanish. E.g.: 'Nuevo'
   */
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

  /**
   * Function to format item response to send to frontend.
   *
   * @param   {Item} item item's raw data from api
   * @returns {FormattedItemDetailData} item formatted as requested to send to frontend
   */
  const formatItemDetailData = async (item) => {
    const formattedDetail = {
      id: item.id,
      title: item.title,
      price: await formatPrice(item.currency_id, item.price),
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

  //** Send response with requested format */
  res.send({
    author: author,
    item: await formatItemDetailData(itemData),
  });
};

module.exports = self;

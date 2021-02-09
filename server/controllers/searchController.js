import axios from 'axios';

const baseUrl = 'https://api.mercadolibre.com'

const searchItems = (req, res, next) => {
  const query = req.query.search;
  console.log('query', query)

  const author = {
    'name': 'Giselle',
    'lastname': 'Perez'
  }

  const items = [];
  
  const author = [];

  const responseFormat = {
    author,
    categories,
    items
  } 

  return axios  
    .get(`${baseUrl}/sites/MLA/search?q=${query}`)
    .then(response => console.log('RESPONSE', response))
}

module.exports = { searchItems };
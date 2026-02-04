//The API for the information we need. 
const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
  }
  // Returns the data of "category" products from the API url "baseURL" (defined above)
  async getData(category) {
    // Gets the sub url of the products API which contains the information about the category of product. 
    const response = await fetch(`${baseURL}products/search/${category} `);
    // "data" is the information on the product of this category. "data.Result" is just the array of all the products of this category
    const data = await convertToJson(response);
    return data.Result;
  }
  // returns the data of a single product given its id from the API at "baseURL" (defined above)
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Submit checkout order to the server
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };
    
    return await fetch(`${baseURL}checkout`, options).then(convertToJson);
  }
}

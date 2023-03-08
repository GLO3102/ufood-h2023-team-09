const URL = "https://ufoodapi.herokuapp.com/unsecure/restaurants";

export const getRestaurantsByPage = async (page) => {
    const response = await fetch(`${URL}?page=${page}`, {
        Method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
      return response.json();
}


export const getRestaurantByID = async (id) => {
  const response = await fetch(`${URL}/${id}`, {
      Method: 'GET',
    })
    if (response.status !== 200) {
      throw new Error(`Something went wrong : request returned status ${response.status}...`);
  }
    const data = await response.json();
    return data;
}
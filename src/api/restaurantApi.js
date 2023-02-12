const URL = "https://ufoodapi.herokuapp.com/unsecure/restaurants";

export const getRestaurantsByPage = async (page) => {
    const response = await fetch(`${URL}?page=${page}`, {
        Method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      return response.json();
}
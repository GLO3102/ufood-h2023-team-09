const URL = "https://ufoodapi.herokuapp.com/unsecure/users/:id/restaurants/:restaurant-id/visits";

export const getUser = async (something) => {
  const response = await fetch(`${URL}?something=${something}`, {
    Method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

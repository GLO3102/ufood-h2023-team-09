const endpoint = "https://ufoodapi.herokuapp.com/favorites";

export const getFavoriteListById = async (token, id) => {
  const response = await fetch(`${endpoint}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const createFavoriteList = async (token, name, owner) => {
  const response = await fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name: name,
      owner: owner,
    }),
  });
  if (response.status !== 201) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const modifyFavoriteList = async (token, name, owner, listId) => {
  const response = await fetch(`${endpoint}/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name: name,
      owner: owner,
    }),
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const deleteFavoriteListById = async (token, listId) => {
  const response = await fetch(`${endpoint}/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const addFavoriteListItem = async (token, restaurantId, listId) => {
  const response = await fetch(`${endpoint}/${listId}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      id: restaurantId,
    }),
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const removeFavoriteListItem = async (token, restaurantId, listId) => {
  const response = await fetch(
    `${endpoint}/${listId}/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      Authorization: token,
      },
    }
  );
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

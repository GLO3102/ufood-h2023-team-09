const endpoint = "https://ufoodapi.herokuapp.com/users";

export const getFavoriteListsByUserId = async (token, id) => {
  const response = await fetch(`${endpoint}/${id}/favorites?limit=100`, {
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

export const getUserById = async function (token, id) {
  const req = new Request(`${endpoint}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const res = await fetch(req);
  return await res.json();
};

export const getUserVisits = async function (token, id) {
  const req = new Request(`${endpoint}/${id}/restaurants/visits?limit=500`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const postVisit = async function (token, visit) {
  const req = new Request(`${endpoint}/${visit.user_id}/restaurants/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      restaurant_id: visit.resto_id,
      comment: visit.comment,
      rating: visit.rating,
      date: visit.visitDate,
    }),
  });
  const res = await fetch(req);
  return res;
};

export const getUsersBySearch = async function (token, search) {
  const req = new Request(`${endpoint}?q=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

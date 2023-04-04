const endpoint = "https://ufoodapi.herokuapp.com/unsecure/users";

export const getUsersList = async function () {
  const req = new Request(`${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const getFavoriteListsByUserId = async (id) => {
  const response = await fetch(`${endpoint}/${id}/favorites?limit=100`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  return response.json();
};

export const getUserById = async function (id) {
  const req = new Request(`${endpoint}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return await res.json();
};

export const getUserName = async function (id) {
  const req = new Request(`${endpoint}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return await res.json().name;
};

export const getUserFavorites = async function (id) {
  const req = new Request(`${endpoint}/${id}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const getUserVisits = async function (id) {
  const req = new Request(`${endpoint}/${id}/restaurants/visits?limit=500`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const postVisit = async function (visit) {
  const req = new Request(`${endpoint}/${visit.user_id}/restaurants/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export const getUsersBySearch = async function (search) {
  const req = new Request(`${endpoint}?q=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

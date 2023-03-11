const endpoint = "https://ufoodapi.herokuapp.com/unsecure";

export const getUsersList = async function () {
  const req = new Request(`${endpoint}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const getUserById = async function (id) {
  const req = new Request(`${endpoint}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return await res.json();
};

export const getUserName = async function (id) {
  const req = new Request(`${endpoint}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return await res.json().name;
};

export const getUserFavorites = async function (id) {
  const req = new Request(`${endpoint}/users/${id}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const getUserVisits = async function (id) {
  const req = new Request(`${endpoint}/users/${id}/restaurants/visits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await fetch(req);
  return (await res.json()).items;
};

export const getRestaurantById = async function (id) {
  const req = new Request(`${endpoint}/restaurants/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "applicaion/json",
    },
  });
  const res = await fetch(req);
  return await res.json();
};

//liste de id user interessant avec visites: 5f998ff0d4ade30004a658ef         619c57e4fe6e16000458adf4   61afd2fae29b0b000410e432
//liste de id user interessant sans visites: 639bbf092b5bb7844f430e47    639bbb9e2b5bb7844f42f171

const UNSECURE_ENDPOINT = "https://ufoodapi.herokuapp.com/unsecure/restaurants";
const ENDPOINT = "https://ufoodapi.herokuapp.com/restaurants";

export const getRestaurants = async (
  page,
  limit,
  search,
  genres,
  price_ranges,
  lat,
  lon
) => {
  let genresStr = "";
  if (genres.length !== 0) {
    genresStr = `&genres=${genres}`.replaceAll(", ", ",");
  }
  let rangesStr = "";
  if (price_ranges.length !== 0) {
    rangesStr = `&price_range=${price_ranges}`.replaceAll(", ", ",");
  }
  let searchStr = "";
  if (search.length !== 0) {
    searchStr = `&q=${search}`;
  }
  let latStr = "";
  let lonStr = "";
  if (lon !== 0 && lat !== 0) {
    latStr = `&lat=${lat}`;
    lonStr = `&lon=${lon}`;
  }
  const URL = `${UNSECURE_ENDPOINT}?page=${page}&limit=${limit}${genresStr}${rangesStr}${searchStr}${latStr}${lonStr}`;
  const response = await fetch(URL, {
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

export const getAllRestaurants = async (token) => {
  let headers = {
    "Content-Type": "application/json",
  };
  let URL = "";
  if (token !== "") {
    headers.Authorization = token;
    URL = ENDPOINT;
  } else URL = UNSECURE_ENDPOINT;

  let allRestaurants = { items: [], total: 0 };

  let response = await fetch(URL, {
    method: "GET",
    headers,
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  let total = (await response.json()).total;
  response = await fetch(`${URL}?limit=${total}`, {
    method: "GET",
    headers,
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  allRestaurants = await response.json();
  return allRestaurants;
};

export const getRestaurantByID = async (id, token) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let URL = "";
  if (token !== "") {
    headers.Authorization = token;
    URL = ENDPOINT;
  } else URL = UNSECURE_ENDPOINT;

  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers,
  }).catch();
  if (response.status === 404) {
    throw new Error("Restaurant Not Found");
  }
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  const data = await response.json();
  return data;
};

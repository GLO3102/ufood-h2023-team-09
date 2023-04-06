const endpoint = "https://ufoodapi.herokuapp.com/unsecure/restaurants";

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
    rangesStr = `&price_range=${price_ranges}`.replaceAll(" ", "");
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
  const URL = `${endpoint}?page=${page}&limit=${limit}${genresStr}${rangesStr}${searchStr}${latStr}${lonStr}`;
  const response = await fetch(URL, {
    Method: "GET",
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

export const getRestaurantByID = async (id) => {
  const response = await fetch(`${endpoint}/${id}`, {
    Method: "GET",
  });
  if (response.status !== 200) {
    throw new Error(
      `Something went wrong : request returned status ${response.status}...`
    );
  }
  const data = await response.json();
  return data;
};

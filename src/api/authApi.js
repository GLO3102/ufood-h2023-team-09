const endpoint = "https://ufoodapi.herokuapp.com";

export const loginApi = async (email, password) => {
  const response = await fetch(`${endpoint}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${email}&password=${password}`,
  });
  if (response.status !== 200) {
    console.log("login failed");
  }
  return response;
};
export const signupApi = async (name, email, password) => {
  const response = await fetch(`${endpoint}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${name}&email=${email}&password=${password}`,
  });
  if (response.status !== 200) {
    console.log("signup failed");
  }
  return response;
};

export const logoutApi = async () => {
  const response = await fetch(`${endpoint}/logout`, {
    method: "POST",
  });
  if (response.status !== 200) {
    console.log("logout failed");
  }
  return response;
};

export const getTokenApi = async (token) => {
  const response = await fetch(`${endpoint}/tokeninfo`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (response.status !== 200) {
    console.log("get token failed");
  }
  return response;
};

const endpoint = "https://ufoodapi.herokuapp.com";

export const loginApi = async (email, password) => {
    const response = await fetch(`${endpoint}/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        }),
    });
    if (response.status !== 200) {
        throw new Error(
        `Something went wrong : request returned status ${response.status}...`
        );
    }
    return response;
}
export const signupApi = async (name, email, password) => {
    const response = await fetch(`${endpoint}/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        }),
    });
    if (response.status !== 200) {
        throw new Error(
        `Something went wrong : request returned status ${response.status}...`
        );
    }
    return response;
};

export const logoutApi = async () => {
    const response = await fetch(`${endpoint}/logout`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
    });
    if (response.status !== 200) {
        throw new Error(
        `Something went wrong : request returned status ${response.status}...`
        );
    }
    return response;
}
    
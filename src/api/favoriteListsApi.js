const URL = "https://ufoodapi.herokuapp.com/unsecure"

export const getFavoriteListsByUserId = async (id) => {
    const response = await fetch(`${URL}/users/${id}/favorites?limit=100`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json();
}

export const getFavoriteListById = async (id) => {
    const response = await fetch(`${URL}/favorites/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json();
}

export const createFavoriteList = async (name, owner) => {
    const response = await fetch(`${URL}/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            owner: owner,
        }),
    })
    if (response.status !== 201) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json()
}

export const modifyFavoriteList = async (name, owner, listId) => {
    const response = await fetch(`${URL}/favorites/${listId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            owner: owner,
        }),
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json()
}

export const deleteFavoriteListById = async (listId) => {
    const response = await fetch(`${URL}/favorites/${listId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json()
}

export const addFavoriteListItem = async (restaurantId, listId) => {
    const response = await fetch(`${URL}/favorites/${listId}/restaurants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: restaurantId
        }),
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json()
}

export const removeFavoriteListItem = async (restaurantId, listId) => {
    const response = await fetch(`${URL}/favorites/${listId}/restaurants/${restaurantId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.status !== 200) {
        throw new Error(`Something went wrong : request returned status ${response.status}...`);
    }
    return response.json()
}
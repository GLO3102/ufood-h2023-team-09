const endpoint = "https://ufoodapi.herokuapp.com/follow";

export const followUserApi = async (followingId, token) => {
    const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        },
        body: JSON.stringify({
        id: followingId,
        }),
    });
    if (response.status !== 201) {
        console.log('error in follow');
    }
    return response;
};

export const unFollowUserApi = async (unFollowingId ,token) => {
    const response = await fetch(`${endpoint}/${unFollowingId}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        },
    });
    if (response.status !== 200) {
        console.log('error in unfollow');
    }
    return response;
};


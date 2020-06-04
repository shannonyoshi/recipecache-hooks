const URL = "http://localhost:3000";

export const registerUser = async (user) => {
  const jsonUser = JSON.stringify(user);
  try {
    const response = await fetch(`${URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonUser,
    });
    if (response.status === 201) {
      return response.status;
    } else {
      console.log("response", response);
      const jsonResponse = await response.json();
      return jsonResponse.message;
    }
  } catch (e) {
    console.log("e registerUser", e);
  }
};

export const loginUser = async (user) => {
  const jsonUser = JSON.stringify(user);
  try {
    const response = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonUser,
    });
    if (response.status === 200) {
      return 200;
    } else {
      const jsonResponse = response.json();
      return jsonResponse.message;
    }
  } catch (e) {
    console.log("e loginUser", e);
  }
};

export const fetchUserStatus = async () => {
  console.log("fetchUserStatus");
  try {
    const response = await fetch(`${URL}/api/auth/status`);
    const jsonResponse = await response.json();
    console.log("jsonResponse", jsonResponse);
    return jsonResponse.loggedIn;
  } catch (e) {
    console.log("e", e);
  }
};

export const logoutUser = async () => {
  console.log("logout");
  try {
    await fetch(`${URL}/api/auth/logout`);
  } catch (e) {
    console.log("e", e);
  }
};

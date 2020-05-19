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
  } catch (e) {
    console.log("e loginUser", e);
  }
};

export const fetchUserStatus = async () => {
  const response = await fetch(`${URL}/api/auth/status`);
  // console.log("response", response);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return response.data;
  }
};

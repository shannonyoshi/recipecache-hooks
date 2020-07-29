const URL = "http://localhost:3000";

export const fetchUserTags = async () => {
  const response = await fetch(`${URL}/api/recipes/userTags`);
  const jsonResponse = await response.json();
  // console.log("jsonResponse", jsonResponse);
  if (!response.ok) {
    console.log("bad response", response);
  } else {
    return jsonResponse.userTags;
  }
};

export const fetchStandardTags = async () => {
  try {
    const response = await fetch(`${URL}/api/recipes/standardTags`);
    const jsonResponse = await response.json();
    return jsonResponse.standardTags;
  } catch (e) {
    console.log("e", e);
  }
};

export const deleteTag = async (tagId) => {
  try {
    const response = await fetch(`${URL}/api/recipes/userTags/${tagId}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.log("e", e);
  }
};

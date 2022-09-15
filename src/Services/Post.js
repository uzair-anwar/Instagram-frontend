const axios = require("axios").default;

export const create = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_API}/post/create`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

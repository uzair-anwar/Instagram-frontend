const axios = require("axios").default;

export const signup = async (data) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_API}/auth/signup`,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const login = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/auth/login`,
      {
        email: user.email,
        password: user.password,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

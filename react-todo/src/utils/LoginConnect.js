import axios from "axios";

class apiLogin {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
    });
  }

  logIn = async (payload) => {
    try {
      const { data } = await this.api.post("/login", payload);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  signUp = async (payload) => {
    try {
      const { data } = await this.api.post("/signup", payload);
      return data;
    } catch (error) {
      throw error;
    }
  };
}

export default new apiLogin();

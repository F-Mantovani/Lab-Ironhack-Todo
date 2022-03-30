import axios from "axios";

class imageApi{
  constructor(){
    this.api = axios.create({
      baseURL: "http://localhost:9000/user",
    })
    this.api.interceptors.request.use((config) => {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  handleUpload = async (id, theFile) => {
    try {
      const { data } = await this.api.post(`/${id}/uploadImage`, theFile)
      return data
    } catch (error) {
      throw error
    }
  }
};

export default new imageApi();
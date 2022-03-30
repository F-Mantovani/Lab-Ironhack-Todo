import axios from "axios";

class apiTodo {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:9000/todo",
    });
    this.api.interceptors.request.use((config) => {
      const token = window.sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getAllTodo = async () => {
    try {
      const { data } = await this.api.get("/");
      return data;
    } catch (error) {
      throw error;
    }
  };

  updateOneTodo = async ( todoInfo ) => {
    const { id } = todoInfo
    const todoUpdate = {title: todoInfo.title, completed: todoInfo.completed}
    try {
      const { data } = await this.api.put(`/${id}`, todoUpdate);
      return data;
    } catch (error) {
      throw new Error("Cannot Update To Do");
    }
  };

  removeTodo = async (id) => {
    try {
      const { data } = await this.api.delete(`/${id}`);
      return data;
    } catch (error) {
      console.error(error.stack);
    }
  };

  createTodo = async (todoInfo) => {
    try {
      const { data } = await this.api.post("/", todoInfo);
      return data;
    } catch (error) {
      throw new Error("Cannot Create To Do");
    }
  };
}

export default new apiTodo();

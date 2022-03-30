import axios from "axios";

class apiTodo {
  constructor() {
    this.api = axios.create({
      baseURL: "https://iron-todo-lab.herokuapp.com/todo",
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

  updateOneTodo = async ( id, todoInfo ) => {
    console.log(id)
    try {
      const { data } = await this.api.put(`/${id}`, todoInfo);
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

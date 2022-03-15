import axios from "axios";

class apiTodo {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:9000/todo",
    });
  }

  getAllTodo = async () => {
    try {
      const { data } = await this.api.get("/");
      return data;
    } catch (error) {
      throw new Error("Cannot Fetch Data");
    }
  };

  updateOneTodo = async ({ id, todoInfo }) => {
    try {
      const { data } = await this.api.put(`/${id}`, todoInfo);
      console.log(todoInfo);
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
      throw new Error("Cannot Remove To Do");
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

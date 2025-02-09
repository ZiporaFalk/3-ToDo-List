import axios from 'axios';
import config from './config';

// const apiUrl = "http://localhost:5131/index.html"
axios.interceptors.response.use(
  response => response, // אם אין שגיאה, מחזירים את ה-response כמו שהוא
  error => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    try {
      console.log(process.env.REACT_APP_URL);
      const result = await axios.get(`${config.apiUrl}/Items`)
      return result.data;
    }
    catch (e) {
      console.error("Error getTasks", e);

    }
  },

  addTask: async (name) => {
    console.log('addTask', name)
    try {
      const result = await axios.post(`${config.apiUrl}/Items`, { name: name, IsComplete: false })
      console.log("AddTask");
    } catch (e) {
      console.log(e);
      console.log("addTask not sucsses");
    }
    //TODO
    // return {};
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`${config.apiUrl}/Items/${id}/${isComplete}`)
      console.log("SetComplete");
    } catch (e) {
      console.log(e);
      console.log("setCompleted not sucsses");
    }
    //TODO
    // return {};
  },

  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`${config.apiUrl}/Items/${id}`)
      console.log("deleteTask");
    } catch (e) {
      console.log(e);
      console.log("deleteTask not sucsses");
    }
  }
}; 




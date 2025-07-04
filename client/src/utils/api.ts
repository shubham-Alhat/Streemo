import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // if you're using cookies for auth
});

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";

    // If backend returns JSON error
    if (error.response?.data?.message) {
      message = error.response.data.message;

      // If backend sends HTML error page
    } else if (typeof error.response?.data === "string") {
      const html = error.response.data;
      const match = html.match(/<pre>(.*?)<\/pre>/s);
      if (match && match[1]) {
        message = match[1]
          .replace(/<br>/g, "\n")
          .replace(/&nbsp;/g, " ")
          .trim();

        // 🧹 Remove "Error:" and stack trace
        const lines = message.split("\n");
        const firstLine = lines[0].replace(/^Error:\s*/, ""); // remove "Error: " prefix
        message = firstLine;
      }
    }

    error.customMessage = message;
    return Promise.reject(error);
  }
);

export default api;

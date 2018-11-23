import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply to every request
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    //Delete auth header
    delete axios.defaults.headers.common["x-access-token"];
  }
};

export default setAuthToken;

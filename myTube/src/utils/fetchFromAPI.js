import axios from "axios";

const API_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "100",
  },
  headers: {
    "X-RapidAPI-Key": "2fc90b9f25msh20080777a4a17f2p1a5339jsn40567587b2a6",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`, options);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with error:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    throw error; // Rethrow the error for handling by the caller
  }
};

// alternative

// const API_URL = "https://youtube-v3-alternative.p.rapidapi.com";
// const options = {
//   params: {
//     id: "dQw4w9WgXcQ",
//     maxResults: "100",
//   },
//   headers: {
//     "X-RapidAPI-Key": "2fc90b9f25msh20080777a4a17f2p1a5339jsn40567587b2a6",
//     "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
//   },
// };

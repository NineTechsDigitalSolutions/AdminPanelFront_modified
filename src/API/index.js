import Axios from "axios";

// const publicIP = "https://broadcast-backend.herokuapp.com";

// export const publicIP = `http://192.168.100.248:5002`;
export const publicIP = `http://localhost:5002`;
// export const publicIP = `https://librarylkbackend.herokuapp.com`;
//export const publicIP = `http://admin-backend.us-east-1.elasticbeanstalk.com/`;

export const base_url = `${publicIP}`;

export const connection_string = `${base_url}`;

export const imageUrl = `${base_url}/uploads`;

export const publicAPI = Axios.create({ baseURL: connection_string });

export const privateAPI = Axios.create({ baseURL: connection_string });

export const page = 1;
export const perPage = 9;


export const attachToken = async () => {
  const jwt = localStorage.getItem("token");
  privateAPI.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  console.log("Token Attached");
};

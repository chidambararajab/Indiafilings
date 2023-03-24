import axios from 'axios';

export default configAxios = () => {
  const _baseURL = `https://reqres.in/api/`;

  const Axios = axios.create({
    baseURL: _baseURL,
    timeout: 600000,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  Axios.interceptors.response.use(
    response => response,
    err => {
      return new Promise((resolve, reject) => {
        if (err.response && err.response.status === 403) {
          console.log(`${err.response.status}`);
          return false;
        } else if (err.response && err.response.status === 404) {
          console.log(`${err.response.status}`);
          return false;
        } else if (err.response && err.response.status === 401) {
          console.log(`${err.response.status}`);
          return false;
        } else if (
          (typeof err === 'object' || typeof err === 'function') &&
          err !== null
        ) {
          if (!err.response) {
            return false;
          }
        }
        throw err;
      });
    },
  );
  return Axios;
};

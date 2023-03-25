const {Axios} = require('../../config');

export const initialService = async params => {
  try {
    const response = await Axios().get(`users?page=${params}`);
    return response.data;
  } catch (error) {
    console.log(error?.response?.status);
    setIsLoading(false);
  }
};

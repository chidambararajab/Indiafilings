const {Axios} = require('../../config');

export const initialService = async params => {
  console.log('params', params);
  try {
    const response = await Axios().get(`users?page=${params}`);
    return response.data;
    //   if (response.data?.total_pages >= currentPage) {
    //     const temp = response.data.data.map(_ => {
    //       return {..._, isSelected: false, isDeleted: false};
    //     });
    //     setData(previousState => [...(previousState || []), ...(temp || [])]);
    //     setTotalPage(response.data?.total_pages);
    //   }
    // setIsLoading(false);
  } catch (error) {
    console.log(error?.response?.status);
    setIsLoading(false);
  }
};

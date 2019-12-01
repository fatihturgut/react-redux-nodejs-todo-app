import axios from 'axios';

export const request = (requestObject = {}) => {
  return axios(requestObject);
};

import axiosApiInstance from './interceptor';
import handleError from '../utils/errorHandler';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  methods: {
    getData(PATH) {
      return new Promise((resolve, reject) => {
        axiosApiInstance
          .get(`${PATH}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(handleError(error));
          });
      });
    },
    postData(PATH, payload) {
      return new Promise((resolve, reject) => {
        axiosApiInstance
          .post(`${PATH}`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(handleError(error));
          });
      });
    },
    patchData(PATH, payload) {
      return new Promise((resolve, reject) => {
        axiosApiInstance
          .patch(`${PATH}`, payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(handleError(error));
          });
      });
    },
    deleteData(PATH) {
      return new Promise((resolve, reject) => {
        axiosApiInstance
          .delete(`${PATH}`)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(handleError(error));
          });
      });
    },
  },
};
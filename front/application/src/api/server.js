import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies

const SERVER = axios.create();

export const setBaseUrl = (server, port) => {
  SERVER.defaults.baseURL = `${server}:${port}`;
};

export const setCredentails = (token) => {
  SERVER.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const dropCredentails = () => {
  delete SERVER.defaults.headers.common.Authorization;
};

/* 
SERVER.interceptors.response.use(
    res => {
        if (res.data.err) {
            store.dispatch(
                showError(typeof res.data.message == "string" ? res.data.message :
                    JSON.stringify(res.data.message)))
            return Promise.reject(res.data.message)
        }
        else return res
    },
    (error) => {
        store.dispatch(showError(error.message))
    }
);
 */

export default SERVER;

import {showError} from "./error-actions"
import axios from "axios"


const SERVER = axios.create({
    baseURL: 'http://localhost:8000'
  })

let store = null

export const injectStoreToServer = _store => {
    store = _store
}

export const setCredentails = (token) => {
    SERVER.defaults.headers.common["Authorization"] = `Bearer ${token}`;

}

export const dropCredentails = (token) => {
    delete SERVER.defaults.headers.common["Authorization"];
}

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

export default SERVER
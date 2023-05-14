import {showError} from "./error-actions"
import axios from "axios"

const SERVER = axios.create({baseURL: 'http://notebook:8000'})

let store = null

export const injectStoreToServer = _store => {
    store = _store
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
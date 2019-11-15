import axios from "axios";
import config from "../config";

const apiBaseUrl = config.api.baseUrl;

/**
 *
 * @param error
 */
const errorHandler = error => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error.response.data;
    }
    if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        throw error.request;
    }
    throw error.message;
};

axios.defaults.baseURL = apiBaseUrl;

/**
 *
 * @param endpoint
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const get = async (endpoint, payload) => {
    try {
        return await axios.get(endpoint, {
            params: { ...payload }
        });
    } catch (error) {
        errorHandler(error);
    }
};

/**
 *
 * @param endpoint
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const post = async (endpoint, payload) => {
    try {
        return await axios.post(endpoint, payload);
    } catch (error) {
        errorHandler(error);
    }
};

/**
 *
 * @param endpoint
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export const put = async (endpoint, payload) => {
    try {
        return await axios.put(endpoint, payload);
    } catch (error) {
        errorHandler(error);
    }
};

export const remove = async (endpoint, payload) => {
    try {
        return await axios.delete(endpoint, {
            data: { ...payload }
        });
    } catch (error) {
        errorHandler(error);
    }
};

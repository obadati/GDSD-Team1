import axios, { AxiosResponse } from "axios";

/**
 *
 * @param url API endpoint
 * @returns {Promise<AxiosResponse>} promise based response
 */
export const httpGET = (url: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios.get(url);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
};

/**
 *
 * @param url API endpoint
 * @param body request payload
 * @returns {Promise<AxiosResponse>} promise based response
 */
export const httpPOST = (url: string, body: object): Promise<AxiosResponse> => {
    let params = new URLSearchParams();
    if (Object.keys(body).length) {
        Object.keys(body).forEach((key) =>
            params.append(key, (body as any)[key])
        );
    }

    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
};

// Response Interceptor
const extractData = (response: AxiosResponse<any>) => response.data;
const handleError = (error: any) => Promise.reject(error);
axios.interceptors.response.use(extractData, handleError);

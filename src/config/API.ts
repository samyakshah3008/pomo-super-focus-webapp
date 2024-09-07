import { refreshAccessTokenEndpoint } from "@/constants/APIEndpoints";
import {
  accessTokenKeyBrowserStorage,
  refreshTokenKeyBrowserStorage,
  userIdKeyBrowserStorage,
} from "@/constants/browser-storage";
import axios from "axios";
import { getCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  saveCredentialsToBrowserStorage,
} from "../lib/browser-storage";

var axioInstance = axios.create();

// Override timeout default for the library
// Now all requests will wait 2.5 seconds before timing out
axioInstance.defaults.timeout = 50000;

interface Headers {
  [key: string]: string;
}

interface Props {
  [key: string]: any;
}

interface Response {
  data: any;
  headers: Headers;
}

const transformHeaders = (axiosHeaders: any): Headers => {
  const headers: Headers = {};
  Object.keys(axiosHeaders).forEach((key) => {
    headers[key] = axiosHeaders[key];
  });
  return headers;
};

export const get = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .get(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, {
        headers: {
          authorization: "Bearer " + getCookie(accessTokenKeyBrowserStorage),
          "pomosuperfocus-request-id": uuidv4(),
          ...headers,
        },
        params: formBody,
      })
      .then((result) => {
        resolve({
          data: result.data,
          headers: transformHeaders(result.headers),
        });
      })
      .catch(async (error) => {
        if (error?.response?.data?.data?.message === "jwt expired") {
          await getJwt(nodeURL, formBody, headers, get).then((res) => {
            resolve(res);
          });
        } else {
          reject(error);
        }
        reject(error?.response?.data);
      });
  });

export const getWithoutToken = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .get(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, {
        headers: {
          "pomosuperfocus-request-id": uuidv4(),
          ...headers,
        },
        params: formBody,
      })
      .then((result) => {
        resolve(result);
      })
      .catch(async (error) => {
        reject(error?.response?.data);
      });
  });

export const postWithoutToken = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .post(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, formBody, {
        headers: { "pomosuperfocus-request-id": uuidv4() },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error?.response?.data);
      });
  });

export const postWithToken = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    // if (headers) {
    //   axioInstance.defaults.headers["content-type"] =
    //     headers.headers["content-type"];
    // }
    axioInstance.defaults.headers["authorization"] =
      "Bearer " + getCookie(accessTokenKeyBrowserStorage);

    axioInstance
      .post(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, formBody, {
        headers: {
          "pomosuperfocus-request-id": uuidv4(),
          authorization: "Bearer " + getCookie(accessTokenKeyBrowserStorage),
          ...headers,
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch(async (error) => {
        if (error?.response?.data?.data?.message === "jwt expired") {
          await getJwt(
            nodeURL,
            formBody || {},
            headers || {},
            postWithToken
          ).then((res) => {
            resolve(res);
          });
        } else {
          reject(error?.response?.data);
        }
      });
  });

export const put = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .put(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, formBody, {
        headers: {
          authorization: "Bearer " + getCookie(accessTokenKeyBrowserStorage),
          "pomosuperfocus-request-id": uuidv4(),
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch(async (error) => {
        if (error?.response?.data?.Error == "invalid or expired jwt") {
          await getJwt(nodeURL, formBody || {}, headers || {}, put).then(
            (res) => {
              resolve(res);
            }
          );
        } else {
          reject(error?.response?.data);
        }
      });
  });

export const patch = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .patch(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, formBody, {
        headers: {
          authorization: "Bearer " + getCookie(accessTokenKeyBrowserStorage),
          "pomosuperfocus-request-id": uuidv4(),
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch(async (error) => {
        if (error?.response?.data?.Error == "invalid or expired jwt") {
          await getJwt(nodeURL, formBody || {}, headers || {}, put).then(
            (res) => {
              resolve(res);
            }
          );
        } else {
          reject(error?.response?.data);
        }
      });
  });

export const deleteRequest = (
  nodeURL: string,
  formBody?: Record<string, any>,
  headers?: Headers,
  props?: Props
): Promise<Response | any> =>
  new Promise((resolve, reject) => {
    axioInstance
      .delete(process.env.NEXT_PUBLIC_BASE_URL + nodeURL, {
        headers: {
          authorization: "Bearer " + getCookie(accessTokenKeyBrowserStorage),
          "pomosuperfocus-request-id": uuidv4(),
          ...headers,
        },
        params: formBody,
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch(async (error) => {
        if (error?.response?.data?.Error == "invalid or expired jwt") {
          await getJwt(
            nodeURL,
            formBody || {},
            headers || {},
            deleteRequest
          ).then((res) => {
            resolve(res);
          });
        } else {
          reject(error?.response?.data);
        }
      });
  });

export const getJwt = (
  nodeURL: string = "",
  callBack: any,
  formBody?: Record<string, any>,
  headers?: Headers | any
) =>
  new Promise((resolve, reject) => {
    var axioInstance = axios.create();
    const userId = getLocalStorageItem(userIdKeyBrowserStorage);
    axioInstance
      .post(
        process.env.NEXT_PUBLIC_BASE_URL + refreshAccessTokenEndpoint,
        { refreshToken: getCookie(refreshTokenKeyBrowserStorage) },
        {
          headers: { "cosmofeed-request-id": uuidv4() },
        }
      )
      .then((result) => {
        saveCredentialsToBrowserStorage(
          result.data?.data?.accessToken,
          result.data?.data?.refreshToken,
          userId
        );
        if (callBack) {
          callBack(nodeURL, formBody || {}, headers || {}).then((res: any) => {
            resolve(res);
          });
        }
      })
      .catch((error) => {
        removeLocalStorageItem(accessTokenKeyBrowserStorage);
        removeLocalStorageItem(refreshTokenKeyBrowserStorage);
      });
  });

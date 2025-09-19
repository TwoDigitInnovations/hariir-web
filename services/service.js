import axios from "axios";
import { useRouter } from "next/router";

// export const ConstantsUrl = "http://localhost:3003/api/";
export const ConstantsUrl = "https://api.guuldoon.com/api/";

function Api(method, url, data, router) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }

    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: { Authorization: `jwt ${token}` },
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        console.error("API Error:", err);

        const status = err?.response?.status;

        if (status === 401 || status === 403) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("userDetail");
          }

          if (router) {
            router.push("/");
          }
        }

        // Reject with detailed error
        if (err.response) {
          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}

function ApiFormData(method, url, data, router) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }
    console.log(token);
    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        console.log(err);
        if (err.response) {
          if (err?.response?.status === 401) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("userDetail");
              router.push("/");
            }
          }
          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}



export { Api, ApiFormData };

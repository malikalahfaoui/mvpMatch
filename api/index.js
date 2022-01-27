import { filterData, formatDate } from "./selector";

const API_URL = "http://178.63.13.157:8090/mock-api/api/";

export const getProjects = () =>
  fetch(API_URL + "projects").then((res) => res.json()).then(({data}) => data);

export const getGateways = () =>
  fetch(API_URL + "gateways").then((res) => res.json()).then(({data}) => data);

export const getUsers = () => fetch(API_URL + "users").then((res) => res.json()).then(({data}) => data);

export const getData = (params={}) =>{
    const {projectId, gatewayId, from = "", to = ""} = params;
    return fetch(API_URL + "report", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        from,
        to,
        gatewayId:  gatewayId === "all" ? undefined : gatewayId,
        projectId: projectId === "all" ? undefined : projectId,
      }),
    })
      .then((res) => res.json())
      .then((res) => filterData(res));
}


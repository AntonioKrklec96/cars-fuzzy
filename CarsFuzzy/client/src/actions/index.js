import axios from "axios";

export function getCars(
  limit = 10,
  start = 0,
  order = "asc",
  search = "",
  list = ""
) {
  const request = axios
    .get(
      `/api/getCars?limit=${limit}&skip=${start}&order=${order}&search=${search}`
    )
    .then((response) => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: "GET_CARS",
    payload: request,
  };
}

export function addCar(car) {
  const request = axios.post("/api/car", car).then((response) => response.data);

  return {
    type: "ADD_CAR",
    payload: request,
  };
}

export function clearCar() {
  return {
    type: "CLEAR_NEWCAR",
    payload: {},
  };
}

/*  USER   */

export function loginUser({ email, password }) {
  const request = axios
    .post("/api/login", { email, password })
    .then((response) => response.data);
  return {
    type: "USER_LOGIN",
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/auth").then((response) => response.data);

  return {
    type: "USER_AUTH",
    payload: request,
  };
}

export function register(user) {
  const request = axios
    .post("/api/register", user)
    .then((response) => response.data);
  return {
    type: "REGISTER",
    payload: request,
  };
}

export function clearUser() {
  return {
    type: "CLEAR_NEWUSER",
    payload: {},
  };
}

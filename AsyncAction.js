const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// case
// request, success, failed;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// type
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESSDED = "FETCH_USERS_SUCCESSDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

// ACTION CREATOR

function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

function fetchUserSuccess(user) {
  return {
    type: FETCH_USERS_SUCCESSDED,
    payload: user,
  };
}

function fetchUserFailed(error) {
  return {
    type: fetchUserFailed,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESSDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// async action creator

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        const users = res.data.map((value) => value.id);
        dispatch(fetchUserSuccess(users));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFailed(err.message));
      });
  };
};

console.log("initial state", store.getState());

store.subscribe(() => {
  console.log("update state", store.getState());
});

store.dispatch(fetchUsers());

const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce;
const applyMiddleware = redux.applyMiddleware;

const STREET_UPDATE = "STREET_UPDATE";

function updateStreet(street) {
  return {
    type: STREET_UPDATE,
    payload: street,
  };
}

const initialState = {
  name: "roshan",
  age: "27",
  address: {
    state: "MP",
    city: "Bhopal",
    street: "Saket",
    nearMarke: {
      bac: "fjkdj",
    },
  },
};

const reudcer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATE:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reudcer);

console.log("intial state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});

store.dispatch(updateStreet("MPNagar"));

unsubscribe();

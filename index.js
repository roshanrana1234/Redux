// import redux from 'redux'
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreator = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

console.log("This is Index");

// ACTION TYPE
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
// ACTION OBJECT
// {
//   type: CAKE_ORDERED;
// }

// ACTION CREATOR
function orderCake() {
  return {
    type: CAKE_ORDERED,
  };
}

function restoredCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// Initial State
const initialStateCake = {
  numberOfCake: 10,
};

const initialStateIceCream = {
  numberOfIceCream: 20,
};

// Reducer
// (state,action) => newState
const cakeReducer = (state = initialStateCake, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCake: state.numberOfCake - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numberOfCake: state.numberOfCake + action.payload,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

// Global State
const store = createStore(rootReducer, applyMiddleware(logger));

const action = bindActionCreator(
  { orderCake, restoredCake, orderIceCream, restockIceCream },
  store.dispatch
);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  //   console.log("updated state", store.getState());
});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restoredCake(3));

action.orderCake();
action.orderCake();
action.orderCake();
action.restoredCake(3);
action.orderIceCream();
action.orderIceCream();
action.orderIceCream();
action.restockIceCream(3);

unsubscribe();

// // import redux from 'redux'
// const redux = require("redux");
// const createStore = redux.createStore;
// const bindActionCreator = redux.bindActionCreators;

// console.log("This is Index");

// // ACTION TYPE
// const CAKE_ORDERED = "CAKE_ORDERED";
// const CAKE_RESTOCKED = "CAKE_RESTOCKED";
// const ICECREAM_ORDERED = "ICECREAM_ORDERED";
// const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
// // ACTION OBJECT
// // {
// //   type: CAKE_ORDERED;
// // }

// // ACTION CREATOR
// function orderCake() {
//   return {
//     type: CAKE_ORDERED,
//   };
// }

// function restoredCake(qty = 1) {
//   return {
//     type: CAKE_RESTOCKED,
//     payload: qty,
//   };
// }

// function orderIceCream(qty = 1) {
//   return {
//     type: ICECREAM_ORDERED,
//     payload: qty,
//   };
// }

// function restockIceCream(qty = 1) {
//   return {
//     type: ICECREAM_RESTOCKED,
//     payload: qty,
//   };
// }

// // Initial State
// const initialState = {
//   numberOfCake: 10,
//   numberOfIceCream: 20,
// };

// // Reducer
// // (state,action) => newState
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numberOfCake: state.numberOfCake - 1,
//       };
//     case CAKE_RESTOCKED:
//       return {
//         ...state,
//         numberOfCake: state.numberOfCake + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numberOfIceCream: state.numberOfIceCream - 1,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numberOfIceCream: state.numberOfIceCream + action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Global State
// const store = createStore(reducer);

// const action = bindActionCreator(
//   { orderCake, restoredCake, orderIceCream, restockIceCream },
//   store.dispatch
// );

// console.log("Initial State", store.getState());

// const unsubscribe = store.subscribe(() => {
//   console.log("updated state", store.getState());
// });

// // store.dispatch(orderCake());
// // store.dispatch(orderCake());
// // store.dispatch(orderCake());
// // store.dispatch(restoredCake(3));

// action.orderCake();
// action.orderCake();
// action.orderCake();
// action.restoredCake(3);
// action.orderIceCream();
// action.orderIceCream();
// action.orderIceCream();
// action.restockIceCream(3);

// unsubscribe();

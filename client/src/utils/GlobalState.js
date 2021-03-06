// used to instantiate a new Context object. The more meaningful term we can 
// use here is that we're using it to create the container to hold our global 
// state data and functionality so we can provide it throughout our app
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// instantiate the global state object
const StoreContext = createContext();
// Provider is a special type of React component that we wrap our application in 
// so it can make the state data that's passed into it as a prop available to all 
// other components
const { Provider } = StoreContext;

// create a custom provider function that will be used to manage and update 
// our state using the reducers
const StoreProvider = ({ value = [], ...props }) => {
  // state variable holds the values and the dispatch sets the values in the 
  // application
  const [state, dispatch] = useProductReducer({
    // give initial values to the properties in the store
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
  });
    // use this to confirm it works!
    console.log(state);
    // give the provider component the getter and setter without leaving behind
    // other props
    return <Provider value={[state, dispatch]} {...props} />;
  };

//   custom React Hook to receive the [state, dispatch] data 
// our StoreProvider provider manages 
  const useStoreContext = () => {
    return useContext(StoreContext);
  };    
  
  export { StoreProvider, useStoreContext };
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from "../../utils/GlobalState";
import React, { useEffect } from 'react';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';

function CategoryMenu({ }) {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  // retrieve the current state from the global state object 
  // and the dispatch() method to update state
  const [state, dispatch] = useStoreContext();
  // need the catagories array so we destructure it out
  const { categories } = state;

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

// use the dispatch() method to set our global state with categoryData
// when useQuery() finishes, and we have data in categoryData, the 
// useEffect() Hook runs again and notices that categoryData exists! 
// Because of that, it does its job and executes the dispatch() function.
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating 
      // the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  // update the global state using click handler instead of the Home useState updater f(x)
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;

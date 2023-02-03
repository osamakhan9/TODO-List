// Action Types
export const GET_TODO = "GET_TODO";
export const FILTER_TODO = "FILTER_TODO";


export const getData = (data) => {
  return {
    type: GET_TODO,
    payload: data,
  };
};

export const filterData = (data) => {
  return {
    type: FILTER_TODO,
    payload: data,
  };
};



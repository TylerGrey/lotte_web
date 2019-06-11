import { SIGN_IN } from "../actionTypes";

const initialState = {
  user: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN: {
      const { data } = action.payload;
      localStorage.setItem('user', JSON.stringify(data));
      return {
        ...state,
        user: data,
      };
    }
    default:
      return state;
  }
}

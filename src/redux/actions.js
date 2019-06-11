import { SIGN_IN } from "./actionTypes";

export const signIn = data => ({
  type: SIGN_IN,
  payload: { data },
});

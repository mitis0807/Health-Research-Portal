import {
  INIT_URL,

  SIGNIN_USER,
  SIGNOUT_USER,

} from '../../constants/ActionTypes';


export const userSignIn = (user) => {
  console.log('user in action', user);
  return {
    type: SIGNIN_USER,
    payload: user,
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER,
  };
};

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

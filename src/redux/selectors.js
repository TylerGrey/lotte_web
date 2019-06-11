export const getUser = store => store.app.user;
export const getLoginUser = () => localStorage.getItem('user');

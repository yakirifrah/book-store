export const authAdminListener = () => {
  const user = JSON.parse(sessionStorage.getItem('admin'));
  if (!user?.login || !user?.token || user?.role !== 'admin') {
    return;
  }
  return user;
};

export const signOutAdmin = () => {
  const user = JSON.parse(sessionStorage.getItem('admin'));
  if (user?.login && user?.token && user?.role === 'admin') {
    return sessionStorage.removeItem('admin');
  }
};

export const authUserListener = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user?.login || !user?.token || user?.role !== 'user') {
    return;
  }
  return user;
};

export const signOutUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.login && user?.token && user?.role === 'user') {
    return localStorage.removeItem('user');
  }
};

export const addDefaultSrc = (event) => {
  event.target.src = '/images/books/default-placeholder-image-300x300.png';
};

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('admin'))
    ? JSON.parse(sessionStorage.getItem('admin'))
    : JSON.parse(localStorage.getItem('user'));
};

export const signOut = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('admin');
};

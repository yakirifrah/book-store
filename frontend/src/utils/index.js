export const authAdminListener = () => {
  const user = JSON.parse(sessionStorage.getItem('login'));
  if (!user?.login || !user?.token || user?.role !== 'admin') {
    return;
  }
  return user;
};

export const signOutAdmin = () => {
  const user = JSON.parse(sessionStorage.getItem('login'));
  if (user?.login && user?.token && user?.role === 'admin') {
    return sessionStorage.removeItem('login');
  }
};

export const authUserListener = () => {
  const user = JSON.parse(localStorage.getItem('login'));
  if (!user?.login || !user?.token || user?.role !== 'user') {
    return;
  }
  return user;
};

export const signOutUser = () => {
  const user = JSON.parse(localStorage.getItem('login'));
  if (user?.login && user?.token && user?.role === 'user') {
    return localStorage.removeItem('login');
  }
};

export const addDefaultSrc = (event) => {
  event.target.src = '/images/books/default-placeholder-image-300x300.png';
};

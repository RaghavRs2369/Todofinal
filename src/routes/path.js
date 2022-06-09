function pathCreator(root, sublink) {
    return `${root}${sublink}`; // Template literals (Template strings)
  }
  
  export const ROOT_NAME = 'techstep/';
  export const ROOT_AUTH = '/auth';
  export const ROOT_TODO = '/todo';
  
  export const PATH_AUTH = {
    root: ROOT_AUTH,
    login: pathCreator(ROOT_AUTH, '/login'),
    register: pathCreator(ROOT_AUTH, '/register'),
  };
  
  export const PATH_TODO = {
    root: ROOT_TODO,
    list: pathCreator(ROOT_TODO, '/list'),
    view: pathCreator(ROOT_TODO, '/view'),
  };
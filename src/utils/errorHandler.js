// handleError.js - Common Error Handler Function
// eslint-disable-next-line import/no-anonymous-default-export
export default (error) => {
    try {
      const { response } = error;
  
      switch (Number(response.status)) {
        case 400:
          return response.data.message;
  
        //handle known errors
        case 401:
          return response.data.message;
  
        // do something when you're unauthenticated
        case 403:
          return 'Not a valid user';
  
        // do something when you're unauthorized to access a resource
        case 500:
          return 'Server error';
  
        // do something when your server exploded
        default:
          return 'Something went wrong';
  
        // handle normal errors with some alert or whatever
      }
    } catch (err) {
      return 'Something went wrong';
    }
  };
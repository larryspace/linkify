'use strict';

const API_ROOT = 'http://' + window.location.hostname + '/api/';
const apiFetch = (endpoint, method = 'GET', body) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
  const headers = new Headers();

  const token = localStorage.getItem('token');

  if(token){
    headers.append('Authorization', 'Token ' + token);
  }

  const options = {
    method: method,
    headers: headers,
  };

  if(body){
    if(body instanceof FormData){
      options.body = body;
    }else{
      options.body = JSON.stringify(body);
    }
  }

  return fetch(fullUrl, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        return json;
      })
    );
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { endpoint, method, body, types } = callAPI


  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return apiFetch(endpoint, method, body).then(
    response => next(actionWith({
      response: response.response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};

import axios from 'axios';

const csrfToken = document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
axios.interceptors.response.use(function (response) {
    if (response.data.data) {
      let newResponse = {...response}
      newResponse.data = newResponse.data.data
      return newResponse;
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
});
export default axios

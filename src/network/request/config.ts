let baseURL = 'http://123.207.32.32:8000/';
const timeout = 10000;
if (process.env.NODE_ENV == 'development') {
  baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {
  baseURL = 'http://123.207.32.32:8000/';
} else if (process.env.NODE_ENV == 'test') {
  baseURL = 'http://123.207.32.32:8000/';
}
export { baseURL, timeout };

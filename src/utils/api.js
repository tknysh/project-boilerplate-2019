import { _, qs, axios, CancelToken } from 'third-party';

const axiosFetcher = axios.create({
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
  validateStatus: status => status >= 200 && status < 400,
  paramsSerializer: params =>
    _.isEmpty(params) ? '' : `${qs.stringify(params)}`,
});

export const fetchApi = (url, options) => {
  const requestTokenSource = setRequestToken(url);
  return axiosFetcher(url, {
    cancelToken: requestTokenSource.token,
    ...options,
  })
    .then(response => {
      removeRequestToken(url);
      return response.data;
    })
    .catch(error => {
      removeRequestToken(url);
      throw error;
    });
};
export const pendingRequestTokens = new Map();

export const setRequestToken = url => {
  const pendingRequestToken = pendingRequestTokens.get(url);

  if (pendingRequestToken) {
    pendingRequestToken.cancel();
  }

  const requestTokenSource = CancelToken.source();
  pendingRequestTokens.set(url, requestTokenSource);

  return requestTokenSource;
};

export const removeRequestToken = (url, shouldCancel) => {
  const pendingRequestToken = pendingRequestTokens.get(url);
  if (pendingRequestToken && shouldCancel) {
    pendingRequestToken.cancel();
  }
  pendingRequestTokens.delete(url);
};

export const cancelRequest = url => removeRequestToken(url, true);

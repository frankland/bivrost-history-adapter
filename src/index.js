export default function delayAdapter(adapter, actionHistory) {
  return function(url, params) {
    const sequence = actionHistory.sequence(url);

    const delayProxySuccess = data => {
      sequence('api request success', {
        url,
        params
      });

      return data;
    };

    const delayProxyError = error => {
      sequence('api request error', {
        url,
        params
      });

      return Promise.reject(error);
    };

    sequence('api request', {
      url,
      params
    });

    return adapter(url, params).then(delayProxySuccess, delayProxyError);
  }
};

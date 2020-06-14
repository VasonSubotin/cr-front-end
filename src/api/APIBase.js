import { create } from "apisauce";

/**
 * API builder class that creates calls for shorthand usage in inherited classes.
 *
 * @param baseURL - BaseURL for API initialization.
 */
export class APIBase {
  constructor(baseURL) {
    this.api = create({
      baseURL,
    });
  }

  /**
   * Request model.
   *
   * @param type - Type of request.
   * @param url - Url part after baseURL.
   * @param data - Data to pass through call.
   * @param headers - Additions headers to use while performing request.
   */
  request = (type = "get", url, data = {}, headers = {}) =>
    this.api[type](url, data, { headers })
      .then((response) => ({ response }))
      .catch((error) => ({ error }));

  /**
   * Shorthand functions to perform calls of a specific type.
   */
  get = (url, data = {}, headers = {}) => this.request("get", url, data, headers);
  post = (url, data = {}, headers = {}) => this.request("post", url, data, headers);
  put = (url, data = {}, headers = {}) => this.request("put", url, data, headers);
  delete = (url, data = {}, headers = {}) => this.request("delete", url, data, headers);

  /**
   * API settings functions.
   */
  setAccessToken = (accessToken, tokenType = "Bearer") => {
    this.api.setHeader("Authorization", `${tokenType} ${accessToken}`);
  };
  clearAccessToken = () => {
    this.api.deleteHeader("Authorization");
  };
}

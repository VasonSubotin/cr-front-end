import { APIBase } from "../APIBase";

export class ServerAPI extends APIBase {
  // GET
  getUserProfile = () => this.get("getUserProfile");
  getUserResources = () => this.get("getUserResources");
  smartCarSignIn = () => this.get("login");

  // POST
  authenticate = ({ userName, password }) =>
    this.post("authenticate", { username: userName, password });
  signUp = ({ userName, password }) => this.post("signup", { username: userName, password });
}

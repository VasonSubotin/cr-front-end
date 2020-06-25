import { APIBase } from "../APIBase";

export class ServerAPI extends APIBase {
  // GET
  getResources = () => this.get("resources");
  smartCarSignIn = () => this.get("login");

  // POST
  authenticate = ({ ...data }) => this.post("authenticate", { ...data });
  signUp = ({ ...data }) => this.post("signup", { ...data });
}

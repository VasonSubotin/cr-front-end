import { APIBase } from "../APIBase";

export class ServerAPI extends APIBase {
  // GET
  signInByGoogle = () => this.get("googleLogin");
  getAccounts = () => this.get("accounts");
  getResources = () => this.get("resources");
  smartCarSignIn = () => this.get("login");

  // POST
  authenticate = ({ ...data }) => this.post("authenticate", { ...data });
  signUp = ({ ...data }) => this.post("signup", { ...data });
  startGoogleSession = ({ code, ...data }) => this.post(`googleSession?code=${code}`, { ...data });
}

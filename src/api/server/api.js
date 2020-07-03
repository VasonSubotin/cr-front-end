import { APIBase } from "../APIBase";

export class ServerAPI extends APIBase {
  // GET
  signInByGoogle = () => this.get("googleLogin");
  getAccounts = () => this.get("accounts");
  getResources = () => this.get("getData");
  smartCarSignIn = () => this.get("login");

  // POST
  authenticate = ({ ...data }) => this.post("authenticate", { ...data });
  signUp = ({ ...data }) => this.post("signup", { ...data });
  startGoogleSession = ({ code, ...data }) => this.post(`googleSession?code=${code}`, { ...data });
  startSmartCarSession = ({ code, ...data }) =>
    this.post(`smartCarSession?code=${code}`, { ...data });
}

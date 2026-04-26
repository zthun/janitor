import { cloneDeep, isUndefined, omitBy } from "lodash-es";
import type { ServerOptions } from "vite";

export class ZViteServerBuilder {
  private options: ServerOptions = {};

  public allowedHost(name: string | string[] | true) {
    if (name === true) {
      this.options.allowedHosts = true;
    } else if (this.options.allowedHosts !== true) {
      const hosts = this.options.allowedHosts || [];
      this.options.allowedHosts = hosts.concat(name);
    }

    return this;
  }

  public denyAllHosts() {
    delete this.options.allowedHosts;
    return this;
  }

  public port(port?: number) {
    this.options.port = port;
    return this;
  }

  public strictPort() {
    this.options.strictPort = true;
    return this;
  }

  public host(ip: string) {
    this.options.host = ip;
    return this;
  }

  public localhost = this.host.bind(this, "127.0.0.1");

  public dev() {
    return this.strictPort().host("0.0.0.0").allowedHost(true);
  }

  public build(): ServerOptions {
    const clone = cloneDeep(this.options);
    return omitBy<ServerOptions>(clone, isUndefined);
  }
}

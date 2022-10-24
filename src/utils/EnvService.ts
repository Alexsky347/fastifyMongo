export default class EnvService {
  public static getEnv(envName: any, envDefault?: any) {
    return process.env[envName] || envDefault;
  }
}

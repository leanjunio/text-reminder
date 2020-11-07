export interface IDatabaseConfig {
    HOST: string;
    PORT: string;
    USER: string;
    PASSWORD: string;
    NAME: string;
    URI: string;
}
declare const config: IDatabaseConfig;
export default config;

import { IDatabaseConfig } from './database';
interface IConfig {
    PORT: number | string;
    DB: IDatabaseConfig;
}
export declare const config: IConfig;
export {};

export interface CommonConfig {
    prefixText?: string | boolean;
    dateFormat?: string | boolean;
}
export interface GlobalLogConfig extends CommonConfig {
    data?: boolean;
    url?: boolean;
    method?: boolean;
    headers?: boolean;
    status?: boolean;
    statusText?: boolean;
    code?: boolean;
}
export interface RequestLogConfig extends CommonConfig {
    data?: boolean;
    url?: boolean;
    method?: boolean;
    headers?: boolean;
}
export interface ResponseLogConfig extends CommonConfig {
    data?: boolean;
    status?: boolean;
    statusText?: boolean;
    headers?: boolean;
}
export interface ErrorLogConfig extends CommonConfig {
    data?: boolean;
    code?: boolean;
}

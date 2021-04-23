import { ErrorLogConfig, GlobalLogConfig, RequestLogConfig, ResponseLogConfig } from './types';

let globalConfig: Required<GlobalLogConfig> = {
    method: true,
    url: true,
    data: true,
    status: true,
    statusText: true,
    logger: console.log,
    prefixText: 'Axios',
    dateFormat: false,
    headers: false,
    responseTime: true,
};

function getGlobalConfig() {
    return globalConfig;
}

function setGlobalConfig(config: GlobalLogConfig) {
    globalConfig = {
        ...globalConfig,
        ...config,
    };
}

function assembleBuildConfig(config: RequestLogConfig | ResponseLogConfig | ErrorLogConfig): Required<GlobalLogConfig> {
    return {
        ...globalConfig,
        ...config,
    };
}

export {
    getGlobalConfig,
    setGlobalConfig,
    assembleBuildConfig,
};

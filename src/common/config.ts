import { ErrorLogConfig, GlobalLogConfig, RequestLogConfig, ResponseLogConfig } from './types';

let globalConfig: GlobalLogConfig = {
    url: true,
    method: true,
    data: true,
    status: true,
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

function assembleBuildConfig(config?: RequestLogConfig | ResponseLogConfig | ErrorLogConfig) {
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
import { AxiosResponse } from 'axios';
import { ResponseLogConfig } from '../common/types';
import { assembleBuildConfig } from '../common/config';
import StringBuilder from '../common/string-builder';

function responseLogger(response: AxiosResponse, config: ResponseLogConfig = {}) {
    const {config: {url, method, params}, status, statusText, data, headers} = response;
    const buildConfig = assembleBuildConfig(config);

    const stringBuilder = new StringBuilder(buildConfig);
    const log = stringBuilder
        .makeLogTypeWithPrefix('Response')
        .makeDateFormat(new Date())
        .makeMethod(method)
        .makeUrl(url)
        .makeParams(params)
        .makeStatus(status, statusText)
        .makeHeader(headers)
        .makeData(data)
        .build();

    buildConfig.logger(log);

    return response;
}

export default responseLogger;

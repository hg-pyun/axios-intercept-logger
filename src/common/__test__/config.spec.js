import { getGlobalConfig, assembleBuildConfig, setGlobalConfig } from '../config';

const DEFAULT_PREFIX = 'Axios';
const customLoggerFunction = console.info;

test('Default globalConfig properties should be all true + console should be the logger', () => {
    expect(getGlobalConfig()).toEqual({
        method: true,
        url: true,
        data: true,
        status: true,
        statusText: true,
        logger: console.log,
        dateFormat: false,
        prefixText: DEFAULT_PREFIX,
        headers: false,
        responseTime: true,
    });
});

test('setGlobalConfig should set config. getGlobalConfig should return globalConfig object.', () => {
    const globalConfig = {
        data: true,
        url: false,
        logger: customLoggerFunction,
    };

    setGlobalConfig(globalConfig);
    expect(getGlobalConfig()).toEqual({
        method: true,
        url: false,
        data: true,
        status: true,
        statusText: true,
        logger: customLoggerFunction,
        dateFormat: false,
        prefixText: DEFAULT_PREFIX,
        headers: false,
        responseTime: true,
    });
});

test('assembleBuildConfig should return merged with globalConfig object.', () => {
    const globalConfig = {
        data: true,
        url: true,
        logger: console.log,
    };

    setGlobalConfig(globalConfig);
    const buildConfig = assembleBuildConfig({
        dateFormat: 'hh:mm:ss',
        data: false,
    });

    expect(buildConfig).toEqual({
        method: true,
        url: true,
        data: false,
        status: true,
        statusText: true,
        logger: console.log,
        dateFormat: 'hh:mm:ss',
        prefixText: DEFAULT_PREFIX,
        headers: false,
        responseTime: true,
    });
});

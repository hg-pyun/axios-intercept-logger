import { getGlobalConfig, assembleBuildConfig, setGlobalConfig } from '../config';

const DEFAULT_PREFIX = 'Axios';
const customLoggerFunction = console.info;

test('Default globalConfig properties should be equal to default values', () => {
    expect(getGlobalConfig()).toEqual({
        method: true,
        url: true,
        params: false,
        data: true,
        status: true,
        statusText: true,
        logger: console.log,
        dateFormat: false,
        prefixText: DEFAULT_PREFIX,
        headers: false,
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
        params: false,
        data: true,
        status: true,
        statusText: true,
        logger: customLoggerFunction,
        dateFormat: false,
        prefixText: DEFAULT_PREFIX,
        headers: false,
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
        params: false,
        data: false,
        status: true,
        statusText: true,
        logger: console.log,
        dateFormat: 'hh:mm:ss',
        prefixText: DEFAULT_PREFIX,
        headers: false,
    });
});

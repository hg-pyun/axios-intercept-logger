import { requestLogger, setGlobalConfig } from '../../index';

const printLog = jest.fn(() => {});

const axiosRequestConfig = {
    data: {
        id: 1,
        text: 'this is dummy log',
    },
    method: 'GET',
    url: 'https://github.com/hg-pyun',
    headers: [],
};

beforeEach(() => {
    printLog.mockClear();
    setGlobalConfig({ logger: printLog });
});

test('request should be return immutable AxiosRequestConfig', () => {
    const mockLogger = jest.fn(requestLogger);
    mockLogger(axiosRequestConfig);
    expect(mockLogger).toReturnWith(axiosRequestConfig);
});

test('if config is undefined, logger make default log', () => {
    requestLogger(axiosRequestConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[Axios][Request]'));
    expect(printLog).toBeCalledWith(expect.stringContaining(axiosRequestConfig.method));
    expect(printLog).toBeCalledWith(expect.stringContaining(axiosRequestConfig.url));
    expect(printLog).toBeCalledWith(expect.stringContaining(JSON.stringify(axiosRequestConfig.data)));
});

test('if global config is defined only, logger make log with options', () => {
    const globalConfig = {
        prefixText: '[global custom prefix]',
    };

    setGlobalConfig(globalConfig);
    requestLogger(axiosRequestConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[global custom prefix]'));
});

test('if local config is defined only, logger make log with options', () => {
    const localConfig = {
        prefixText: '[local custom prefix]',
    };

    requestLogger(axiosRequestConfig, localConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[local custom prefix]'));
});

test('if both global and local config are defined, local config should override global config', () => {
    const globalConfig = {
        prefixText: '[global custom prefix]',
    };

    const localConfig = {
        prefixText: '[local custom prefix]',
    };

    setGlobalConfig(globalConfig);
    requestLogger(axiosRequestConfig, localConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[local custom prefix]'));
});

test('if prefixText is false, remove prefix', () => {
    const globalConfig = {
        prefixText: false,
    };

    setGlobalConfig(globalConfig);
    requestLogger(axiosRequestConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.not.stringContaining('[Axios]'));
});

test('if custom logger is respected', () => {
    const customPrintLog = jest.fn(() => {});

    requestLogger(axiosRequestConfig, { logger: customPrintLog });
    expect(printLog).not.toHaveBeenCalled();
    expect(customPrintLog).toHaveBeenCalled();
});

import { responseLogger, setGlobalConfig } from '../../index';

const printLog = jest.fn(() => {});

const axiosResponse = {
    config: {
        url: 'https://github.com/hg-pyun',
        method: 'GET',
        headers: [],
    },
    data: 'dummy data',
    status: 500,
    statusText: 'internal server error',
    headers: '',
};

beforeEach(() => {
    printLog.mockClear();
    setGlobalConfig({ logger: printLog });
});

test('response should be return immutable AxiosResponse', () => {
    const mockLogger = jest.fn(responseLogger);
    mockLogger(axiosResponse);
    expect(mockLogger).toReturnWith(axiosResponse);
});

test('if config is undefined, logger make default log', () => {
    const {
        status,
        statusText,
        data,
        config: { url, method },
    } = axiosResponse;

    responseLogger(axiosResponse);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[Axios][Response]'));
    expect(printLog).toBeCalledWith(expect.stringContaining(method));
    expect(printLog).toBeCalledWith(expect.stringContaining(url));
    expect(printLog).toBeCalledWith(expect.stringContaining(`${status}:${statusText}`));
    expect(printLog).toBeCalledWith(expect.stringContaining(data));
});

test('if global config is defined only, logger make log with options', () => {
    const globalConfig = {
        prefixText: '[global custom prefix]',
    };

    setGlobalConfig(globalConfig);
    responseLogger(axiosResponse);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[global custom prefix]'));
});

test('if local config is defined only, logger make log with options', () => {
    const localConfig = {
        prefixText: '[local custom prefix]',
    };

    responseLogger(axiosResponse, localConfig);
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
    responseLogger(axiosResponse, localConfig);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.stringContaining('[local custom prefix]'));
});

test('if prefixText is false, remove prefix', () => {
    const globalConfig = {
        prefixText: false,
    };

    setGlobalConfig(globalConfig);
    responseLogger(axiosResponse);
    expect(printLog).toHaveBeenCalled();
    expect(printLog).toBeCalledWith(expect.not.stringContaining('[Axios]'));
});

test('if custom logger is respected', () => {
    const customPrintLog = jest.fn(() => {});

    responseLogger(axiosResponse, { logger: customPrintLog });
    expect(printLog).not.toHaveBeenCalled();
    expect(customPrintLog).toHaveBeenCalled();
});

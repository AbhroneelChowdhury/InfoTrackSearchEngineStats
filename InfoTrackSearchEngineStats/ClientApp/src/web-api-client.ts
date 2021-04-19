/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.9.0 (NJsonSchema v10.4.1.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export interface ISearchEngineStatsClient {
    googleStats(searchString: string | undefined, searchAddress: string | undefined): Promise<SearchEngineResultsDto>;
    bingStats(searchString: string | undefined, searchAddress: string | undefined): Promise<SearchEngineResultsDto>;
}

export class SearchEngineStatsClient implements ISearchEngineStatsClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {
        this.instance = instance ? instance : axios.create();
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    googleStats(searchString: string | undefined, searchAddress: string | undefined , cancelToken?: CancelToken | undefined): Promise<SearchEngineResultsDto> {
        let url_ = this.baseUrl + "/search/google?";
        if (searchString === null)
            throw new Error("The parameter 'searchString' cannot be null.");
        else if (searchString !== undefined)
            url_ += "searchString=" + encodeURIComponent("" + searchString) + "&";
        if (searchAddress === null)
            throw new Error("The parameter 'searchAddress' cannot be null.");
        else if (searchAddress !== undefined)
            url_ += "searchAddress=" + encodeURIComponent("" + searchAddress) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGoogleStats(_response);
        });
    }

    protected processGoogleStats(response: AxiosResponse): Promise<SearchEngineResultsDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SearchEngineResultsDto>(<any>null);
    }

    bingStats(searchString: string | undefined, searchAddress: string | undefined , cancelToken?: CancelToken | undefined): Promise<SearchEngineResultsDto> {
        let url_ = this.baseUrl + "/search/bing?";
        if (searchString === null)
            throw new Error("The parameter 'searchString' cannot be null.");
        else if (searchString !== undefined)
            url_ += "searchString=" + encodeURIComponent("" + searchString) + "&";
        if (searchAddress === null)
            throw new Error("The parameter 'searchAddress' cannot be null.");
        else if (searchAddress !== undefined)
            url_ += "searchAddress=" + encodeURIComponent("" + searchAddress) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ = <AxiosRequestConfig>{
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processBingStats(_response);
        });
    }

    protected processBingStats(response: AxiosResponse): Promise<SearchEngineResultsDto> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return result200;
        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<SearchEngineResultsDto>(<any>null);
    }
}

export interface SearchEngineResultsDto {
    searchPosition: number[];
    occurrenceCount: number;
}

export class ApiException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}
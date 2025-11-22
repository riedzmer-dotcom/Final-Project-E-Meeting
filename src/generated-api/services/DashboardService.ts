/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { utils_APIResponse } from '../models/utils_APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DashboardService {
    /**
     * Get dashboard
     * Get dashboard
     * @param startDate Start Date in YYYY-MM-DD format
     * @param endDate End Date in YYYY-MM-DD format
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1Dashboard(
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/dashboard',
            query: {
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}

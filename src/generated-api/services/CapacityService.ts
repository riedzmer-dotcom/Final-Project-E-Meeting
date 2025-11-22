/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CapacityService {
    /**
     * Get all capacities
     * Fetch all capacity with pagination and sorting options
     * @param page Page number
     * @param limit Items per page
     * @param orderBy Order by field
     * @param sortBy Sort by order (asc/desc)
     * @returns void
     * @throws ApiError
     */
    public static getApiV1Capacities(
        page?: number,
        limit?: number,
        orderBy?: string,
        sortBy?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/capacities',
            query: {
                'page': page,
                'limit': limit,
                'order_by': orderBy,
                'sort_by': sortBy,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoomTypeService {
    /**
     * Get all room types
     * Fetch all room types with pagination and sorting options
     * @param page Page number
     * @param limit Items per page
     * @param orderBy Order by field
     * @param sortBy Sort by order (asc/desc)
     * @returns void
     * @throws ApiError
     */
    public static getApiV1RoomTypes(
        page?: number,
        limit?: number,
        orderBy?: string,
        sortBy?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/room-types',
            query: {
                'page': page,
                'limit': limit,
                'order_by': orderBy,
                'sort_by': sortBy,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_RoomRequestSwagger } from '../models/model_RoomRequestSwagger';
import type { utils_APIResponse } from '../models/utils_APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RoomService {
    /**
     * Get all rooms
     * Retrieve a list of rooms with optional pagination and sorting
     * @param capacity filter by capacity of rooms per page (default: 0 for no limit)
     * @param roomType filter by room_type of rooms per page (default: 0 for no limit)
     * @param page Page number (default: 0)
     * @param limit Number of rooms per page (default: 0 for no limit)
     * @param orderBy Field to order by (default: 'id')
     * @param sortBy Sort direction (default: 'desc', can be 'asc')
     * @returns void
     * @throws ApiError
     */
    public static getApiV1Rooms(
        capacity?: number,
        roomType?: number,
        page?: number,
        limit?: number,
        orderBy?: string,
        sortBy?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms',
            query: {
                'capacity': capacity,
                'room_type': roomType,
                'page': page,
                'limit': limit,
                'order_by': orderBy,
                'sort_by': sortBy,
            },
        });
    }
    /**
     * Insert a new room
     * Upload a new room along with its details
     * @param files Room file upload
     * @param name Room name
     * @param price Room price
     * @param roomTypeId Room type ID
     * @param capacity Room capacity
     * @param user Request Input
     * @param description Room description
     * @returns void
     * @throws ApiError
     */
    public static postApiV1Rooms(
        files: Blob,
        name: string,
        price: number,
        roomTypeId: number,
        capacity: number,
        user: model_RoomRequestSwagger,
        description?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/rooms',
            formData: {
                'files': files,
                'name': name,
                'description': description,
                'price': price,
                'room_type_id': roomTypeId,
                'capacity': capacity,
            },
            body: user,
        });
    }
    /**
     * Get a room
     * Retrieve details of a room by its ID
     * @param id Room ID
     * @returns void
     * @throws ApiError
     */
    public static getApiV1Rooms1(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a room
     * Update a room along with its details
     * @param id Room ID
     * @param files Room file upload
     * @param name Room name
     * @param price Room price
     * @param roomTypeId Room type ID
     * @param capacityId Room capacity
     * @param description Room description
     * @returns void
     * @throws ApiError
     */
    public static putApiV1Rooms(
        id: number,
        files: Blob,
        name: string,
        price: number,
        roomTypeId: number,
        capacityId: number,
        description?: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/rooms/{id}',
            path: {
                'id': id,
            },
            formData: {
                'files': files,
                'name': name,
                'description': description,
                'price': price,
                'room_type_id': roomTypeId,
                'capacity_id': capacityId,
            },
        });
    }
    /**
     * Delete a room
     * Delete a room by its ID
     * @param id Room ID
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Rooms(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/rooms/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get List Reservations by room id
     * Get List Reservations by room id
     * @param id Room ID
     * @param startDate Start Date in YYYY-MM-DD format
     * @param endDate End Date in YYYY-MM-DD format
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1RoomsReservations(
        id: number,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/rooms/{id}/reservations',
            path: {
                'id': id,
            },
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

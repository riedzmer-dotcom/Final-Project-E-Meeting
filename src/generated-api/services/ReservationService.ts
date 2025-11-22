/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_ReservationCodeRequest } from '../models/model_ReservationCodeRequest';
import type { model_ReservationCreateRequestSwagger } from '../models/model_ReservationCreateRequestSwagger';
import type { model_ReservationUpdateRequest } from '../models/model_ReservationUpdateRequest';
import type { utils_APIResponse } from '../models/utils_APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReservationService {
    /**
     * Delete reservation
     * Delete reservation
     * @param id Reservation ID
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static deleteApiV1Reservation(
        id: number,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/reservation/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Update reservation status
     * Update reservation status
     * @param id Reservation ID
     * @param status Reservation Status Request
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static putApiV1ReservationStatuses(
        id: number,
        status: model_ReservationUpdateRequest,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/reservation/{id}/statuses',
            path: {
                'id': id,
            },
            body: status,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Get All Reservations
     * Get All Reservations
     * @param startDate Start Date in  YYYY-MM-DD format
     * @param endDate End Date in  YYYY-MM-DD format
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1Reservations(
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reservations',
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
    /**
     * Save a reservation code
     * Save the reservation code based on the provided details
     * @param reservation Reservation Code Request
     * @returns void
     * @throws ApiError
     */
    public static postApiV1Reservations(
        reservation: model_ReservationCodeRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/reservations',
            body: reservation,
        });
    }
    /**
     * Get reservation history
     * Get reservation history
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1ReservationsHistories(): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reservations/histories',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Inquiry reservation details
     * Get reservation details based on the provided input
     * @param reservation Reservation Code Request
     * @returns void
     * @throws ApiError
     */
    public static postApiV1ReservationsInquiry(
        reservation: model_ReservationCreateRequestSwagger,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/reservations/inquiry',
            body: reservation,
        });
    }
    /**
     * Get reservation detail
     * Get reservation detail
     * @param id Reservation ID
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1Reservations1(
        id: number,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reservations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_UserUpdateProfileRequest } from '../models/model_UserUpdateProfileRequest';
import type { utils_APIResponse } from '../models/utils_APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Update user profile
     * Update user profile
     * @param user User Update Profile Request
     * @param files Profile picture
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static putApiV1Users(
        user: model_UserUpdateProfileRequest,
        files?: Blob,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users',
            formData: {
                'files': files,
            },
            body: user,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Get user by ID
     * Get user by ID
     * @param id User ID
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static getApiV1Users(
        id: number,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}',
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

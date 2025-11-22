/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { model_UserCreateRequest } from '../models/model_UserCreateRequest';
import type { model_UserForgotPasswordRequest } from '../models/model_UserForgotPasswordRequest';
import type { model_UserLoginRequest } from '../models/model_UserLoginRequest';
import type { model_UserResetPasswordRequest } from '../models/model_UserResetPasswordRequest';
import type { utils_APIResponse } from '../models/utils_APIResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Forgot Password
     * Send OTP to email for password reset
     * @param user User Forgot Password Request
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static postApiV1AuthForgotPassword(
        user: model_UserForgotPasswordRequest,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/forgot-password',
            body: user,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Login
     * Login with the provided username and password, user has role admin or user
     * @param user User Login Request
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static postApiV1AuthLogin(
        user: model_UserLoginRequest,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: user,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Register a new user
     * Register a new user with the provided details
     * @param user User Create Request
     * @returns utils_APIResponse Created
     * @throws ApiError
     */
    public static postApiV1AuthRegister(
        user: model_UserCreateRequest,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: user,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * Reset Password
     * Reset password with the provided new password
     * @param id id
     * @param user User Reset Password Request
     * @returns utils_APIResponse OK
     * @throws ApiError
     */
    public static postApiV1AuthResetPassword(
        id: string,
        user: model_UserResetPasswordRequest,
    ): CancelablePromise<utils_APIResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/reset-password/{id}',
            path: {
                'id': id,
            },
            body: user,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}

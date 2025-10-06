/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse__message_string__ } from '../models/ApiResponse__message_string__';
import type { ApiResponse_ProductResponseDto_ } from '../models/ApiResponse_ProductResponseDto_';
import type { ApiResponse_ProductResponseDto_Array_ } from '../models/ApiResponse_ProductResponseDto_Array_';
import type { Partial_ProductDto_ } from '../models/Partial_ProductDto_';
import type { ProductDto } from '../models/ProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
    /**
     * @returns ApiResponse_ProductResponseDto_Array_ Ok
     * @throws ApiError
     */
    public static getProducts(): CancelablePromise<ApiResponse_ProductResponseDto_Array_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponse_ProductResponseDto_ Ok
     * @throws ApiError
     */
    public static createProduct(
        requestBody: ProductDto,
    ): CancelablePromise<ApiResponse_ProductResponseDto_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponse__message_string__ Ok
     * @throws ApiError
     */
    public static deleteProduct(
        id: string,
    ): CancelablePromise<ApiResponse__message_string__> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponse_ProductResponseDto_ Ok
     * @throws ApiError
     */
    public static updateProduct(
        id: string,
        requestBody: Partial_ProductDto_,
    ): CancelablePromise<ApiResponse_ProductResponseDto_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}

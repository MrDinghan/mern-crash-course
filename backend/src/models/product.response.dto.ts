import {
  createAutoTransformer,
  DocumentType,
  MongoBaseFields,
} from "@/utils/document-transformer";

import { ProductDto } from "./product.dto";

export interface ProductResponseDto extends ProductDto, MongoBaseFields {
  /**
   * MongoDB Object ID
   * @example "507f1f77bcf86cd799439011"
   */
  _id: string;

  /**
   * Created timestamp
   * @example "2023-10-01T00:00:00.000Z"
   */
  createdAt: string;

  /**
   * Updated timestamp
   * @example "2023-10-01T00:00:00.000Z"
   */
  updatedAt: string;
}

export const productTransformer = createAutoTransformer<
  DocumentType<ProductDto>,
  ProductResponseDto
>();

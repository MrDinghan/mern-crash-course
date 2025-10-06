export interface ProductDto {
  /**
   * Product name
   * @example "Product A"
   */
  name: string;

  /**
   * Product price
   * @example 100
   */
  price: number;

  /**
   * Product image URL
   * @example "https://example.com/product-a.jpg"
   */
  image: string;
}

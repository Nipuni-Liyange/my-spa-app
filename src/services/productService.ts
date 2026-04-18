import api from './api'
import type { ProductsResponse, Product } from '../types/product'

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>('/products?limit=100')
  return response.data
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

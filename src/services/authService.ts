import api from './api'
import type { AuthResponse, LoginPayload } from '../types/auth'

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', payload)
  return response.data
}
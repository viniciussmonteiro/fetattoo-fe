export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
  return response.success;
}

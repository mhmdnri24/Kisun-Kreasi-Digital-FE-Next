import { Pagination } from "./pagination";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    lists: T[];
    pagination: Pagination;
  };
}
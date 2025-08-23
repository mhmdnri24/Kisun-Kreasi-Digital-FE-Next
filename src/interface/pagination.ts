export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;  
  items_per_page: number;
  has_next: boolean;
  has_prev: boolean;
}
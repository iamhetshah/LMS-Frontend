export interface CheckoutModel {
  book_date: string;
  checkout_date: string;
  due_date: string;
  penalty: number;
  return_data: string;
  returned: boolean;
  book_id: number;
  issued_by: number;
  user_id: string;
}

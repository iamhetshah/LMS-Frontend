export interface UserModel {
  UUID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  pinCode: number;
  role: 'USER' | 'LIBRARIAN' | 'ADMIN';
}

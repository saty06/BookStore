export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: {enum: ['admin', 'user']};
  mobileNo: number;
  id?: string | number;
}

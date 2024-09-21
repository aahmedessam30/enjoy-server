
export interface IContact {
  readonly id: string
  email?: string;
  name: string;
  message: string;
  mobile: string
  createdAt?: Date
  updatedAt?: Date
}
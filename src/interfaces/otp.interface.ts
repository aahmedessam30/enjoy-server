export interface IOtp {
  readonly id: string
  mobile: string;
  used?: number | boolean;
  code: number;
  expiresIn?: Date;
  updatedAt?: Date
}

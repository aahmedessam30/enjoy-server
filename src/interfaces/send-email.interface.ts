export interface ISendEmail {
  readonly id?: string
  userId?: string | null
  email: string
  template: string
  subject: string
  context: string
  status?: EmailStatus
  createdAt?: Date
  updatedAt?: Date
}

export enum EmailStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

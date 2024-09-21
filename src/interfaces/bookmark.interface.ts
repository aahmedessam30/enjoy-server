export interface IBookmark {
  readonly id: string
  userId?: string | null
  unitId?: string | null
  createdAt?: Date
}

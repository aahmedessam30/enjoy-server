//Business logic for all Stats routes
import { User } from "../../../db"

export default class StatsProvider {
  async getUsersStats() {
    const totalUsers = await User.count()
    let stats = {}
    if (totalUsers) {
      stats = Object.assign(stats, {
        totalUsers,
      })
    }
    const result = { message: "Fetched successfully", payload: { stats }, status: "success" }
    return { result }
  }
}

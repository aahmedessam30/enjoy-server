import PropertyProvider from "../unit/unit.provider"

export default (socket, io) => {
  const userId: number = socket.userId
  userId && socket.join(`${userId}`)

  /**
   * @description: this event for search property (notify) with userId
   */
  socket.on("offer:new", (body: { requestId: string }) => {
    if (userId && body.requestId) socket.join(`${userId}_${body.requestId}`)
  })
  /**
   * @description: this event for join to chat room
   */
  socket.on("chat:room", (body: { chatId: number }) => {
    if (userId && body.chatId) socket.join(`${body.chatId}`)
  })
}
// notify:receive
// chat:list
// chat:room
// offer:new

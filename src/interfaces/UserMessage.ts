export default interface UserMessage {
  id: number,
  content: string,
  email: string,
  date: string,
  importance: number | null,
  rating: number,
  isComplaint: number,
  file: string,
}

export default interface Feedback {
  id: number,
  content: string,
  email: string,
  date: string,
  importance: number | null,
  rating: number,
}

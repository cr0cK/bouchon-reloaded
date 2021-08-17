export type MyStore = {
  users: Array<{ id: number; name: string }>
  settings: {
    languages: string[]
  }
}

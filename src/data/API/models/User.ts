// Define the user type
export type User = {
  uid: string
  token: string
  date: string
  hour: string
  valid: boolean
}

// Then define the factory function to create a user
export const createUser = (
  uid: string,
  token: string,
  date: string,
  hour: string,
  valid: boolean
): User => {
  return {
    uid,
    token,
    date,
    hour,
    valid,
  }
}

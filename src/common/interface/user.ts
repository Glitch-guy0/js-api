

export type User = {
  name: String
  email: String
  password: String | null
  OAuth:{
    key: String | null
    expiry: Date | null
  }
  session:{
    token: String | null
    expiry: Date | null
  }
}
export interface AtmoicParticipant {
  person: Person
  account_id?: string | null
  corporate_id?: string | null
  ownership_percentage?: number
  participant_role: string
  authorized_signer: boolean
}

export interface Person {
  country_of_citizenship?: any
  address?: Address
  employment?: Employment
  first_name?: string
  last_name?: string
  date_of_birth?: string
  tax_id?: string | null
  tax_id_type?: string | null
  email?: string
  phone_number?: string
}

export interface Address {
  country_code?: string
  street?: string
  city?: string
  region?: string
  postal_code?: string
}

export interface Employment {
  address: Address | null
  status?: string
  employer?: string
  industry?: string
  position?: string
}


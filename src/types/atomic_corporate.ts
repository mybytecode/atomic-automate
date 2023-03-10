export interface AtomicCorporate {
  custom_id: string
  financial_profile: FinancialProfile
  tax_profile: TaxProfile
  identity: Identity
}

export interface FinancialProfile {
  source_of_funds: string
}

export interface TaxProfile {
  tax_id?: string
  tax_id_type: string
  us_exempt_payee_code: string
}


export interface Identity {
  address?: Address
  formation_date?: string
  legal_name?: string
  dba_name?: string
  entity_type?: string
  email?: string
  phone_number?: string
  governing_country?: string
  governing_region?: string
}

export interface Address {
  country_code?: string
  street?: string
  city?: string
  region?: string
  postal_code?: string
}

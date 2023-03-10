export interface KYB {
  data: Data
}

export interface Data {
  id: string
  status: string
  last_updated_at: string
  initiated_at: string
  is_acknowledged: boolean
  details: Detail[]
}

export interface Detail {
  key: string
  value: string
  status: string
  parent: string
  message: any
  id: string
}

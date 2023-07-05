export interface BusinessUnit {
  bu_id: number,
  bu_name: string,
  api_url: string,
  description: string,
  environtment: string,
  status: string,
  deleted_at: string | null,
  created_at: string,
  updated_at: string
}

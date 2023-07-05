export interface Limit {
  limit_id: number,
  limit_name: string,
  limit_rules: string,
  limit_description: string,
  limit_type: string | number,
  status: string,
  deleted_at: string | null,
  created_at: string,
  updated_at: string
}

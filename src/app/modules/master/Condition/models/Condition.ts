export interface MasterCondition {
  condition_id: number,
  condition_type_id: number,
  value: number | string ,
  condition: string,
  condition_type: string,
  status: string,
  deleted_at: string | null,
  created_at: string,
  updated_at: string
}

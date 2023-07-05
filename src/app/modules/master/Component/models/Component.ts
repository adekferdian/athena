export interface MasterComponent {
  component_id: number,
  component_name: string,
  description: string,
  meta_data: string,
  status: string,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
}

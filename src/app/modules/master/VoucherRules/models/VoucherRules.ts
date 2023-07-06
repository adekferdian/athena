import { Voucher } from "src/app/models/voucher.type";
import { BusinessUnit } from "../../BusinessUnit/models/BusinessUnit";
import { MasterComponent } from "../../Component/models/Component";
import { MasterRules } from "../../Rules/models/MasterRules";

export interface VoucherRules {
  id: number,
  bu_id: number,
  voucher_id: number,
  rules_id: number,
  component_id: number,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
  rules: MasterRules,
  business_unit: BusinessUnit,
  component: MasterComponent,
  voucher: Voucher,
  status?:string,
}

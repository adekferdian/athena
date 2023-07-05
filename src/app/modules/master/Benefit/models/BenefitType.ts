import { MasterBenefitType } from "../../BenefitType/models/BenefitType";

export interface MasterBenefit {

  benefit_id: number,
  benefit_type: number,
  benefit_name: string,
  benefit_description: string,
  meta_data: string,
  status: string,
  deleted_at: string | null,
  created_at: string,
  updated_at: string,
  type: MasterBenefitType

}

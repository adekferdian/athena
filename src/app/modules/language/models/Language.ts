export interface Language {
  id: string
  logo:string
  description:string
  status:number
}


export interface UpdateLanguage {
  id: string
  logo:string
  description:string
  status: string
}

export enum LanguageStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

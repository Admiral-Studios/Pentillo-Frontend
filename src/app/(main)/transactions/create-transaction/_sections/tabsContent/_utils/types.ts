import {
  HOA_FREQUENCY,
  OCCUPANCY,
  PROPERTY_TYPE,
  SIDE,
  SOURCE,
  STATUS,
} from '@/types/enum'

type TTypeField = 'select' | 'date'

interface IOption {
  value: string
  name: string
}

interface IFields<T> {
  id: number
  name: T
  label: string
  type?: TTypeField
  width?: number
  options?: IOption[]
}

interface IListingFormInputs {
  listDate?: Date | null
  expireDate?: Date
  beds: number
  bath: number
  built?: Date
  lot: string
  sqft: number
  costSqft: number
  taxId?: string
  hoaFee?: string
  hoaFrequency: HOA_FREQUENCY
  parcelId?: string
  occupancy: OCCUPANCY
  lockBoxCode?: string
  lockBoxLocation?: string
  securityAlarmCode?: string
  mls: string
  remark?: string
  additionalInfo?: string
  fileNumber: string
  financing: string
  concessions: string
  earnestMoney: number
  additionalProvisions?: string
  otherInfo?: string
}

interface IPayoutFormInputs {
  broker: number
  teamLead: number
  primaryAgent: number
  goAgent: number
  referral: number
  firstAssistant: number
  secondAssistant: number
  agentCommission: number
  estimatedGrossPayout: number
  actualGrossPayout: number
  commissionNote: number
}

interface IAddressFormInputs {
  streetNumber: number
  dir: string
  street: string
  unit?: number
  purchase: number
  netPurchase: number
  city: string
  state: string
  zipCode: number
  country: string
  listAmount: number
  closedDate?: Date
  side: SIDE
  source?: SOURCE
  propertyType: PROPERTY_TYPE
  status: STATUS
}

interface ITemplateFormInputs {
  templateId?: string
}

export type {
  IAddressFormInputs,
  IFields,
  IListingFormInputs,
  ITemplateFormInputs,
  IPayoutFormInputs,
}

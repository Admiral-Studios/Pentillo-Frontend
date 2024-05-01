import {
  HOA_FREQUENCY,
  OCCUPANCY,
  PROPERTY_TYPE,
  SIDE,
  SOURCE,
  STATUS,
} from '@/types/enum'
import { getOptionsFromEnum } from './getOptionsFromEnum'
import {
  IAddressFormInputs,
  IFields,
  IListingFormInputs,
  IPayoutFormInputs,
} from './types'

const addressFields: IFields<keyof IAddressFormInputs>[] = [
  { id: 0, name: 'streetNumber', label: 'Street Number', width: 168 },
  { id: 1, name: 'dir', label: 'Dir', width: 168 },
  { id: 2, name: 'street', label: 'Street', width: 250 },
  { id: 3, name: 'unit', label: 'Unit #', width: 168 },
  { id: 4, name: 'purchase', label: 'Purchase $', width: 168 },
  { id: 5, name: 'netPurchase', label: 'Net Purchase $', width: 168 },
  { id: 6, name: 'city', label: 'City', width: 250 },
  { id: 7, name: 'state', label: 'State', width: 168 },
  { id: 8, name: 'zipCode', label: 'Zip Code', width: 168 },
  { id: 9, name: 'country', label: 'County', width: 168 },
  { id: 10, name: 'listAmount', label: 'List $', width: 168 },
  {
    id: 11,
    name: 'closedDate',
    label: 'Closed Date',
    width: 168,
    type: 'date',
  },
  {
    id: 12,
    name: 'side',
    label: 'Side',
    type: 'select',
    width: 278.5,
    options: getOptionsFromEnum(SIDE),
  },
  {
    id: 13,
    name: 'source',
    label: 'Source',
    type: 'select',
    width: 278.5,
    options: getOptionsFromEnum(SOURCE),
  },
  {
    id: 14,
    name: 'propertyType',
    label: 'Property Type',
    type: 'select',
    width: 278.5,
    options: getOptionsFromEnum(PROPERTY_TYPE),
  },
  {
    id: 15,
    name: 'status',
    label: 'Status',
    type: 'select',
    width: 278.5,
    options: getOptionsFromEnum(STATUS),
  },
]

const listingFieldsRightSide: IFields<keyof IListingFormInputs>[] = [
  { id: 19, name: 'fileNumber', label: 'File Number' },
  { id: 20, name: 'financing', label: 'Financing' },
  { id: 21, name: 'concessions', label: 'Concessions' },
  { id: 22, name: 'earnestMoney', label: 'Earnest Money' },
  {
    id: 23,
    name: 'additionalProvisions',
    label: 'Additional Provisions',
  },
  { id: 24, name: 'otherInfo', label: 'Other info' },
]

const listingFieldsLeftSide: IFields<keyof IListingFormInputs>[] = [
  { id: 0, name: 'listDate', label: 'List Date', width: 259, type: 'date' },
  { id: 2, name: 'beds', label: 'Beds', width: 81 },
  { id: 3, name: 'bath', label: 'Bath', width: 81 },
  { id: 5, name: 'lot', label: 'Lot', width: 81 },
  { id: 4, name: 'built', label: 'Built', width: 259, type: 'date' },
  { id: 1, name: 'expireDate', label: 'Expire Date', width: 259, type: 'date' },
  { id: 6, name: 'sqft', label: 'Sqft', width: 125.5 },
  { id: 7, name: 'costSqft', label: '$ / sqft', width: 125.5 },
  { id: 8, name: 'taxId', label: 'Tax ID', width: 259 },
  { id: 9, name: 'hoaFee', label: 'HOA Fee', width: 125.5 },
  {
    id: 10,
    name: 'hoaFrequency',
    label: 'HOA Frequency',
    width: 125.5,
    type: 'select',
    options: getOptionsFromEnum(HOA_FREQUENCY),
  },
  { id: 11, name: 'parcelId', label: 'Parcel ID #', width: 259 },
  {
    id: 12,
    name: 'occupancy',
    label: 'Occupancy',
    width: 259,
    type: 'select',
    options: getOptionsFromEnum(OCCUPANCY),
  },
  { id: 13, name: 'lockBoxCode', label: 'Lock Box Code', width: 259 },
  {
    id: 14,
    name: 'lockBoxLocation',
    label: 'Lock Box Location/Instruction',
    width: 259,
  },
  {
    id: 15,
    name: 'securityAlarmCode',
    label: 'Security Alarm Code',
    width: 259,
  },
  { id: 16, name: 'mls', label: 'MLS #', width: 170 },
  { id: 17, name: 'remark', label: 'Remark', width: 615 },
  { id: 18, name: 'additionalInfo', label: 'Additional Info' },
]

const payoutFieldsLeftSide: IFields<keyof IPayoutFormInputs>[] = [
  { id: 0, name: 'broker', label: 'Broker %', width: 380, type: 'date' },
  { id: 2, name: 'teamLead', label: 'Team Lead %', width: 380 },
  { id: 3, name: 'primaryAgent', label: 'Primary Agent %', width: 380 },
  { id: 5, name: 'goAgent', label: 'Go-Agent %', width: 380 },
  { id: 4, name: 'referral', label: 'Referral %', width: 250, type: 'date' },
  {
    id: 1,
    name: 'firstAssistant',
    label: 'TC/Assistant 1 %',
    width: 250,
  },
  { id: 6, name: 'secondAssistant', label: 'TC/Assistant 2 %', width: 250 },
]

const payoutFieldsRightSide: IFields<keyof IPayoutFormInputs>[] = [
  {
    id: 7,
    name: 'agentCommission',
    label: 'Agent Commission %',
    width: 158,
  },
  {
    id: 8,
    name: 'estimatedGrossPayout',
    label: 'Estimated Gross Payout',
    width: 158,
  },
  {
    id: 9,
    name: 'actualGrossPayout',
    label: 'Actual Gross Payout %',
    width: 324,
  },
  { id: 10, name: 'commissionNote', label: 'Commission Note %', width: 324 },
]

const contactsSectionData = [
  {
    id: '0',
    status: 'Buyer',
    company: 'Vasquez Properties LCC',
    image: '',
    authState: true,
    fullName: 'Marisela Vasquez ',
    phone: '(401) 111-1111',
    email: 'maris154@gmail.com.',
    address: '130 Byron Boulevard, RI 02888',
  },
  {
    id: '1',
    status: 'Buyer',
    company: 'Vasquez Properties LCC',
    image: '',
    authState: false,
    fullName: 'Marisela Vasquez ',
    phone: '(401) 111-1111',
    email: 'maris154@gmail.com.',
    address: '130 Byron Boulevard, RI 02888',
  },
  {
    id: '2',
    status: 'Buyer',
    company: 'Vasquez Properties LCC',
    image: '',
    authState: false,
    fullName: 'Marisela Vasquez ',
    phone: '(401) 111-1111',
    email: 'maris154@gmail.com.',
    address: '130 Byron Boulevard, RI 02888',
  },
  {
    id: '3',
    status: 'Buyer',
    company: 'Vasquez Properties LCC',
    image: '',
    authState: true,
    fullName: 'Marisela Vasquez ',
    phone: '(401) 111-1111',
    email: 'maris154@gmail.com.',
    address: '130 Byron Boulevard, RI 02888',
  },
]

export {
  addressFields,
  contactsSectionData,
  listingFieldsLeftSide,
  listingFieldsRightSide,
  payoutFieldsLeftSide,
  payoutFieldsRightSide,
}

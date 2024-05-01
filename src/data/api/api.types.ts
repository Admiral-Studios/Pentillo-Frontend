import { ISubTask } from '@/app/(main)/tasks/create-task/types'
import {
  CATEGORY,
  HOA_FREQUENCY,
  LIST_TYPE,
  OCCUPANCY,
  PROPERTY_TYPE,
  SIDE,
  SOURCE,
  STATUS,
  SUBCRIPTION_PLAN,
  TASK_STATUS,
  TYPE,
} from '@/types/enum'

export interface IPostAuthGoogleParams {
  code: string
  token?: string
  invitationToken?: string
}

export interface IPostAuthSignUpParams {
  email: string
  password: string
  firstName: string
  lastName: string
  invitationToken?: string
}

export interface IPostAuthSignInParams {
  email: string
  password: string
  invitationToken?: string
}

export interface IPostAuthSignUpSuccessData {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  refreshToken: string
  company: string
  subscription: {
    isActive: boolean
    stripeSessionId: string
    stripeSubscriptionId: string
    stripeCustomerId: string
    userId: string
    startDate: string
    endDate: string
  }
}

export interface IForgotPasswordData {
  email: string
  code: string
}

export interface BDError {
  message: string
  statusCode: number
  error: string
}

export interface IUserUpdateProfile {
  firstName: string
  lastName: string
  company: string
}

export interface IUserUpdateEmail {
  email: string
}

export interface ITransactionParams {
  search?: string
  minPrice?: number
  maxPrice?: number
  status?: string[]
  address?: string[]
  // | 'UNDER_CONTRACT'
  // | 'TERMINATED'
  // | 'PENDING'
  // | 'PRE_LISTING'
  // | 'COMMING_SOON'
  // | 'ACTIVE'
  // | 'CLOSED'
  // | 'WITHDRAWN'
  // | 'EXPIRED'
  startDate?: string
  endDate?: string
  skip?: number
  take?: number
}

export interface IPatchTransactionBody {
  transaction?: {
    streetNumber?: number
    dir: string
    street: string
    unit?: number
    purchase?: number
    netPurchase?: number
    city: string
    state: string
    zipCode?: number
    country: string
    listAmount?: number
    closedDate?: Date
    side?: SIDE
    source?: SOURCE
    propertyType?: PROPERTY_TYPE
    status?: STATUS
    templateId?: string
  }
  transactionDetails?: {
    listDate?: string //
    expireDate?: string //
    beds?: number
    bath?: number
    built?: string //
    lot: string
    sqft?: number
    costSqft?: number
    taxId?: string
    hoaFee?: string
    parcelId?: string
    occupancy?: OCCUPANCY
    lockBoxCode?: string
    lockBoxLocation?: string
    securityAlarmCode?: string
    mls: string
    remark?: string
    additionalInfo?: string
    hoaFrequency?: HOA_FREQUENCY
  }
  contract?: {
    fileNumber: string
    financing: string
    concessions: string
    earnestMoney?: number
    additionalProvisions?: string
    otherInfo?: string
  }
  participant?: {
    goAgentId?: string
    primaryAgentId: string
    firstAssistantId?: string
    secondAssistantId?: string
    buyerAndSellerIds: string[]
    transactionContacts: IContactForOneTransaction[]
  }
}

export interface ITransactionParticipantParams {
  participantId: string
  id: string
  body: IPutTransactionParticipantBody
}

export interface IPutTransactionParticipantBody {
  goAgentId?: string | null
  primaryAgentId: string
  firstAssistantId?: string | null
  secondAssistantId?: string | null
  buyerAndSellerIds: string[]
  transactionContacts?: IContactForOneTransaction[]
}
export interface IPostTransactionPayoutBody {
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

export interface IPostTransactionBody {
  transaction: {
    streetNumber?: number
    dir: string
    street: string
    unit?: number
    purchase?: number
    netPurchase?: number
    city: string
    state: string
    zipCode?: number
    country: string
    listAmount?: number
    closedDate?: Date
    side?: SIDE
    source?: SOURCE
    propertyType?: PROPERTY_TYPE
    status?: STATUS
    templateId?: string
  }
  transactionDetails: {
    listDate?: string //
    expireDate?: string //
    beds?: number
    bath?: number
    built?: string //
    lot: string
    sqft?: number
    costSqft?: number
    taxId?: string
    hoaFee?: string
    parcelId?: string
    occupancy?: OCCUPANCY
    lockBoxCode?: string
    lockBoxLocation?: string
    securityAlarmCode?: string
    mls: string
    remark?: string
    additionalInfo?: string
    hoaFrequency?: HOA_FREQUENCY
  }
  contract: {
    fileNumber: string
    financing: string
    concessions: string
    earnestMoney?: number
    additionalProvisions?: string
    otherInfo?: string
  }
  participant: {
    goAgentId?: string
    primaryAgentId: string
    firstAssistantId?: string
    secondAssistantId?: string
    buyerAndSellerIds: string[]
    transactionContacts: IContactForOneTransaction[]
  }
}

export interface IPostTemplateBody {
  name: string
  propertyTypes?: PROPERTY_TYPE[]
  states?: string[]
  sides?: LIST_TYPE[]
  agents?: IAssignedPerson[]
  datesListIds?: IListData[]
  tasksListIds?: IListData[]
  documentsListIds?: IListData[]
}

export interface IPostNoteBody {
  text: string
}

export interface IRemoveTransactionsParams {
  ids: string[]
}

export interface IRemoveTransactionsNotesParams {
  id: string
  ids: string[]
}

export interface IRemoveTeamMembersParams {
  memberIds: string[]
}

export interface ITransaction {
  data: ITransactionData[]
  count: number
}

export interface ITransactionData {
  id: string
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
  closedDate?: string
  side: SIDE
  source?: SOURCE
  propertyType: PROPERTY_TYPE
  status: STATUS
  creator: ITransactionCreator
  details: ITransactionDetails
  contract: ITransactionContract
  createdAt: string
  agent?: { firstName: string; lastName: string }
}

export interface ICreator {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  refreshToken: string
  company: string
  subscription: {
    isActive: boolean
    stripeSessionId: string
    stripeSubscriptionId: string
    stripeCustomerId: string
    userId: string
    startDate: string
    endDate: string
  }
}

export interface IPostTransactionPayoutResponse {
  id: string
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

export interface IPostTransactionResponse {
  id: string
  streetNumber: number
  dir: string
  street: string
  unit: number
  purchase: number
  netPurchase: number
  city: string
  state: string
  zipCode: number
  country: string
  listAmount: number
  closedDate: string
  side: SIDE
  source: SOURCE
  propertyType: PROPERTY_TYPE
  status: STATUS
  creator: ICreator
  details: {
    id: string
    listDate: string
    expireDate: string
    beds: number
    bath: number
    built: string
    lot: string
    sqft: number
    costSqft: number
    taxId: string
    hoaFee: string
    hoaFrequency: HOA_FREQUENCY
    parcelId: string
    occupancy: OCCUPANCY
    lockBoxCode: string
    lockBoxLocation: string
    securityAlarmCode: string
    mls: string
    remark: string
    additionalInfo: string
  }
  contract: {
    id: string
    fileNumber: string
    financing: string
    earnestMoney: number
    concessions: string
    additionalProvisions: string
    otherInfo: string
  }
  buyersAndSellers: Omit<IBuyerAndSeller, 'isTransactionOnly'>[]
  agent: IAgent[]
  createdAt: '2024-03-07T12:08:18.262Z'
}

export interface ITransactionCreator {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  refreshToken: string
  company: string
  isConfirmed: boolean
}

export interface ITransactionDetails {
  id: string
  listDate: string
  expireDate: string
  beds: number
  bath: number
  built: string
  lot: string
  sqft: number
  costSqft: number
  taxId?: string
  hoaFee?: string
  hoaFrequency?: {}
  parcelId?: string
  occupancy: string
  lockBoxCode?: string
  lockBoxLocation?: string
  securityAlarmCode?: string
  mls: string
  remark?: string
  additionalInfo?: string
}
export interface ITransactionContract {
  id: string
  fileNumber: number
  financing: string
  earnestMoney: number
  concessions: string
  additionalProvisions?: string
  otherInfo?: string
}

export interface ITask {
  data: ITaskData[]
  count: number
}

export interface INote {
  data: INoteData[]
}

export interface ITaskResponse {
  id: string
  title: string
  status: TASK_STATUS
  description?: string
  reminderDate?: Date
  dueDate: Date
  listId?: string
  assignedPerson: {
    id: string
    title: string
    firstName: string
    lastName: string
  }
}
export interface ITaskParams {
  search?: string
  name?: string
  title?: string[]
  email?: string
  skip?: number
  assignedPersonIds?: string[]
  take?: number
  status?: string[]
}

export interface INotesParams {
  search?: string
  skip?: number
  take?: number
}

export interface IContactParams {
  search?: string
  name?: string
  company?: string
  category?: string[]
  email?: string
  skip?: number
  take?: number
}

export interface IContactCompanyListParams {
  search?: string
  skip?: number
  take?: number
}
export interface ITaskAssignedPersonListParams {
  search: string
  skip?: number
  take?: number
}

export interface IAgentsListParams {
  search: string
  skip?: number
  take?: number
}

export interface IStatesListParams {
  search: string
  skip?: number
  take?: number
}

export interface IRemoveContactsParams {
  ids: string[]
}

export interface IRemoveTasksParams {
  ids: string[]
}

export interface IRemoveTemplatesParams {
  ids: string[]
}

export interface IRemoveDatesParams {
  ids: string[]
  listId: string
}

export interface IContact {
  data: IContactData[]
  count: number
}
export interface IListData {
  id: string
  name: string
  type: TYPE
}

export interface IContactData {
  id: string
  title?: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  website?: string
  phone?: string
  email?: string
  fax?: string
  homeAddressLine1?: string
  homeAddressLine2?: string
  homeCity?: string
  homeState?: string
  homeZIP?: string
  workAddressLine1?: string
  workAddressLine2?: string
  workCity?: string
  workState?: string
  workZIP?: string
}

export interface IContactResponse {
  id: string
  title?: string
  firstName: string
  lastName: string
  jobTitle?: string
  company: string
  website?: string
  phone?: string
  email: string
  fax?: string
  homeAddress: {
    city?: string
    lineOne?: string
    lineTwo?: string
    state?: string
    zip?: string
    isPrimary: boolean
  }
  workAddress: {
    city?: string
    lineOne?: string
    lineTwo?: string
    state?: string
    zip?: string
    isPrimary: boolean
  }
  category: CATEGORY
}
export interface IUserSubscriptionInfo {
  id: string
  isActive: boolean
  stripeSessionId: string
  stripeSubscriptionId: string
  stripeCustomerId: string
  userId: string
  startDate: string
  endDate: string
  nextPayment: string
  type: SUBCRIPTION_PLAN
}

export interface ITeamData {
  id: string
  name: string
  members: [
    {
      id: string
      teamId: string
      user: {
        id: string
        email: string
        firstName: string
        lastName: string
        avatar: string
        refreshToken: string
        company: string
        isConfirmed: boolean
      }
      role: {
        id: string
        name: string
        teamId: string
        permission: {}
        financialAndPayment: boolean
        manageTransaction: boolean
        manageTemplates: boolean
      }
    },
  ]
  ownerId: string
}

export interface ITeamMember {
  data: ITeamMemberData[]
  count: number
}

export interface ITeamMemberData {
  id: string
  firstName: string
  middleName: string | null
  lastName: string
  roleName: string
  email: string
  title: null | string
  recentTransactionName: null | string
  recentTransactionId: null | string
}

export interface IContactGetResponse {
  count: number
  data: IContactData[]
}

export interface IContactData {
  id: string
  title?: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  website?: string
  phone?: string
  email?: string
  fax?: string
  homeAddressLine1?: string
  homeAddressLine2?: string
  homeCity?: string
  homeState?: string
  homeZIP?: string
  workAddressLine1?: string
  workAddressLine2?: string
  workCity?: string
  workState?: string
  workZIP?: string
  category?: CATEGORY
}

export interface IContactPostResponse {
  id: string
  title?: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  website?: string
  phone?: string
  email?: string
  fax?: string
  category?: CATEGORY
  homeAddress?: {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
  }
  workAddress?: {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
  }
}

export interface ITaskPostResponse {
  title: string
  description: string
  status: TASK_STATUS
  reminderDate?: string
  dueDate: string
  listId: string
  assignedPersonId: string
  notes?: string
  subTasks?: ISubTask[]
}

export interface ITaskUpdateResponse {
  id: string
  data: ITaskData | { status: TASK_STATUS }
}

export interface IDateUpdateResponse {
  id: string
  data: IDateData
}

export interface IGetDateTimelineParams {
  transactionId?: string
  templateId?: string
}

export interface IGetDateTimelineResponse {
  id: string
  title: string
  dueDate: string
  listId: string
  isPinned: boolean
}

export interface ISubTaskUpdateResponse {
  id: string
  subtaskId: string
  data: ISubTask | { status: TASK_STATUS }
}

export interface ICreateSubTaskResponse {
  id: string
  data: ISubTask
}

export interface IAddTaskToList {
  taskIds: string[]
  listId: string
}

export interface IDeleteSubTaskResponse {
  id: string
  subtaskId: string
}

export interface IContactUpdateResponse {
  id: string
  data: {
    title?: string
    firstName: string
    lastName: string
    jobTitle?: string
    company?: string
    website?: string
    phone?: string
    email?: string
    fax?: string
    category?: CATEGORY
    homeAddress?: {
      lineOne?: string
      lineTwo?: string
      city?: string
      state?: string
      zip?: string
      isPrimary: boolean
    }
    workAddress?: {
      lineOne?: string
      lineTwo?: string
      city?: string
      state?: string
      zip?: string
      isPrimary: boolean
    }
  }
}

export interface IContactForOneTransaction {
  id: string
  firstName: string
  lastName: string
  phone?: string
  category: CATEGORY
  email: string
}

export interface IContactPostData {
  category?: CATEGORY
  title?: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  website?: string
  phone?: string
  email?: string
  fax?: string
  homeAddressLine1?: string
  homeAddressLine2?: string
  homeCity?: string
  homeState?: string
  homeZIP?: string
  workAddressLine1?: string
  workAddressLine2?: string
  workCity?: string
  workState?: string
  workZIP?: string
}

export interface IContactUpdateData {
  id: string
  data: {
    category?: CATEGORY
    title?: string
    firstName: string
    lastName: string
    jobTitle?: string
    company?: string
    website?: string
    phone?: string
    email?: string
    fax?: string
    homeAddress: {
      lineOne: string
      lineTwo: string
      city: string
      state: string
      zip: string
    }
    workAddress: {
      lineOne: string
      lineTwo: string
      city: string
      state: string
      zip: string
    }
  }
}

export interface IAxiosResponse<T> {
  data: IContactData[]
}

export interface ITemplate {
  id: string
  name: string
  propertyTypes?: PROPERTY_TYPE[]
  states?: string[]
  sides?: LIST_TYPE[]
  agents?: IAssignedPerson[]
}

export interface ITemplatePostResponse {
  name: string
  propertyTypes?: string[]
  states?: string[]
  sides?: string[]
  agents?: IAssignedPerson[]
  datesListIds?: IListData[]
  tasksListIds?: IListData[]
  documentsListIds?: IListData[]
}

export interface ITemplateGetResponse {
  data: ITemplate[]
  count: number
}

export interface IAddressParams {
  search: string
  skip?: number
  take?: number
}

// interface IHomeAddress {
//   lineOne: string
//   lineTwo: string
//   city: string
//   state: string
//   zip: string
// }

// interface IWorkAddress {
//   lineOne: string
//   lineTwo: string
//   city: string
//   state: string
//   zip: string
// }

export interface IGetDocumentsParams {
  listId: string
  transactionId?: string
  templateId?: string
  type: TYPE
}

export interface IGetListTasksParams {
  listId: string
  transactionId?: string
  templateId?: string
  type: TYPE
  status?: string[]
}

export interface IGetListDatesParams {
  listId: string
  transactionId?: string
  type: TYPE
}

export interface IAgent {
  id: string
  title: string
  firstName: string
  lastName: string
  jobTitle: string
  company: string
  website: string
  phone: string
  email: string
  fax: string
  category: CATEGORY
  homeAddress: IHomeAddress
  workAddress: IWorkAddress
}

export interface IBuyerAndSeller extends IAgent {
  isTransactionOnly: boolean
}

export interface ITransactionParticipant {
  id: string
  primaryAgent: IAgent
  goAgent?: IAgent
  firstAssistant?: IAgent
  secondAssistant?: IAgent
  buyersAndSellers: IBuyerAndSeller[]
}

export interface IUploadDocumentBody {
  file: File
  note?: string
  listId: string
  name?: string
}

export interface IUpdateDocumentBody {
  file?: File
  note?: string
  listId: string
  name?: string
}

export interface IGetListsParams {
  transactionId?: string
  templateId?: string
  type: TYPE
  name?: string
  skip?: number
  take?: number
}

export interface IGetListByIdParams {
  listId: string
  transactionId?: string
  templateId?: string
  type: TYPE
}

export interface ICreateListParams {
  name: string
  type: TYPE
  transactionId?: string
  templateId?: string
}

export interface ICreateDateParams {
  title: string
  dueDate: Date
  listId: string
  isPinned?: boolean
}

export interface IGetDocumentsResponse {
  type: TYPE
  id: string
  name: string
  transactionId?: string
  templateId?: string
  files?: IFile[]
  dates?: IDate[]
  tasks?: ITaskData[]
  file?: IFile
}

export interface IGetListsResponse {
  data: {
    type: TYPE
    id: string
    name: string
    transactionId?: string
    templateId?: string
    // files?: IFile[]
    // dates?: IDate[]
    // tasks?: ITaskData[]
  }[]
  count: number
}
export interface IGetListResponse {
  type: TYPE
  id: string
  name: string
  transactionId?: string
  templateId?: string
  files?: IFile[]
  dates?: IDate[]
  tasks?: ITaskData[]
}

export interface IGetDateResponse {
  title: string
  dueDate: Date
  listId: string
  isPinned: boolean
}

export interface IFile {
  id: string
  name: string
  size: string
  fullPath: string
  note: string
  user: IUser
  type: string
  listId?: string
  transactionId?: string
  createdAt: string
}

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
  teamId: string
  refreshToken: string
  company: string
  subscription: IUserSubscriptionInfo
  isSignedByGoogle: boolean
}

interface IDate {
  id: string
  title: string
  dueDate: string
  listId: string
  isPinned: boolean
}

export interface ITaskData {
  status: TASK_STATUS
  id: string
  title: string
  description?: string
  reminderDate?: Date
  dueDate: Date
  listId?: string
  notes?: string
  assignedPerson?: IAssignedPerson
}

export interface INoteData {
  id: string
  text: string
  createdAt: string
}

export interface IDateData {
  title: string
  id: string
  listId: string
  dueDate: Date
  isPinned?: boolean
}

export interface IAssignedPerson {
  id: string
  title: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  website?: string
  phone?: string
  email?: string
  fax?: string
  category?: CATEGORY
  homeAddress?: IHomeAddress
  workAddress?: IWorkAddress
}

interface IHomeAddress {
  lineOne?: string
  lineTwo?: string
  city?: string
  state?: string
  zip?: string
  isPrimary?: boolean
}
interface IWorkAddress {
  lineOne?: string
  lineTwo?: string
  city?: string
  state?: string
  zip?: string
  isPrimary?: boolean
}

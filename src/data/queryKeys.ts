import {
  IAddressParams,
  IAgentsListParams,
  IContactCompanyListParams,
  IContactParams,
  IGetDocumentsParams,
  IGetListDatesParams,
  IGetListTasksParams,
  IGetListsParams,
  INotesParams,
  ITaskAssignedPersonListParams,
  ITaskParams,
  ITransactionParams,
} from './api/api.types'

export const userDataKeys = {
  all: ['userData'] as const,
}

export const transactionKeys = {
  all: ['transactionsAll'] as const,
  details: (id: string) => ['details', { id }] as const,
  payout: (id: string) => ['payout', { id }] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  listsAddress: () => ['addressList'] as const,
  list: (filters: ITransactionParams) =>
    [...transactionKeys.lists(), { filters }] as const,
  listAddress: (params: IAddressParams) =>
    [...transactionKeys.listsAddress(), { params }] as const,
}

export const teamsKeys = {
  all: ['teamAll'] as const,
  selectedMember: ['selectedMember'] as const,
  rolesAll: ['rolesAll'] as const,
}

export const subscriptionDataKeys = {
  all: ['subscriptionData'] as const,
}

export const contactsKeys = {
  all: ['contactsAll'] as const,
  lists: () => [...contactsKeys.all, 'list'] as const,
}

export const templatesKeys = {
  all: ['templatesAll'] as const,
  lists: () => [...templatesKeys.all, 'list'] as const,
  details: (id: string) => ['details', { id }] as const,
}

export const contactKeys = {
  all: ['contactsAll'] as const,
  lists: () => [...contactKeys.all, 'list'] as const,
  listsCompanies: () => ['addressList'] as const,
  list: (filters?: IContactParams) =>
    [...contactKeys.lists(), { filters }] as const,
  listCompanies: (params: IContactCompanyListParams) =>
    [...contactKeys.listsCompanies(), { params }] as const,
}

export const taskKeys = {
  all: ['tasksAll'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  listsCompanies: () => ['addressList'] as const,
  list: (filters?: ITaskParams | IGetListTasksParams) =>
    [...taskKeys.lists(), { filters }] as const,
  details: (params: IGetListTasksParams) => ['details', { params }] as const,
  listCompanies: (params: IContactCompanyListParams) =>
    [...taskKeys.listsCompanies(), { params }] as const,
}

export const notesKeys = {
  all: ['notesAll'] as const,
  lists: () => [...notesKeys.all, 'list'] as const,
  list: (filters?: INotesParams) =>
    [...notesKeys.lists(), { filters }] as const,
}

export const dateKeys = {
  all: ['datesAll'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  details: (params: IGetListDatesParams) => ['details', { params }] as const,
  list: (filters?: IGetListDatesParams) =>
    [...dateKeys.lists(), { filters }] as const,
}

export const documnetsKeys = {
  all: ['documnetsAll'] as const,
  lists: () => [...documnetsKeys.all, 'list'] as const,
  details: (params: IGetDocumentsParams) => ['details', { params }] as const,
  download: ['documnetsDownload'] as const,
}

export const listKeys = {
  all: ['listAll'] as const,
  lists: () => [...listKeys.all, 'list'] as const,
  listsAssignedPerson: () => ['assignedPersonList'] as const,
  listAssignedPerson: (params: ITaskAssignedPersonListParams) =>
    [...listKeys.listsAssignedPerson(), { params }] as const,
  listsAssignedAgents: () => ['assignedAgentsList'] as const,
  listAssignedAgents: (params: IAgentsListParams) =>
    [...listKeys.listsAssignedPerson(), { params }] as const,
  listsAssignedStates: () => ['assignedStatesList'] as const,
  listAssignedStates: (params: IAgentsListParams) =>
    [...listKeys.listsAssignedPerson(), { params }] as const,
  listsTitle: () => ['titleList'] as const,
  listTitle: (params: ITaskAssignedPersonListParams) =>
    [...listKeys.listsTitle(), { params }] as const,
  list: (params?: IGetListsParams) =>
    [...listKeys.lists(), { params }] as const,
  details: (id: string) => ['details', { id }] as const,
}

export const subTaskKeys = {
  all: ['subTasksAll'] as const,
  lists: () => [...subTaskKeys.all, 'list'] as const,
  listsCompanies: () => ['addressList'] as const,
  list: (filters?: ITaskParams) =>
    [...subTaskKeys.lists(), { filters }] as const,
  listCompanies: (params: IContactCompanyListParams) =>
    [...subTaskKeys.listsCompanies(), { params }] as const,
}

import { CATEGORY, TASK_STATUS } from '@/types/enum'

export interface IAddNewContactForm {
  title: string
  firstName: string
  lastName: string
  jobTitle?: string
  company?: string
  category?: CATEGORY
  website?: string
  phone?: string
  email: string
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

export interface ISubTask {
  title: string
  dueDate: Date
  status: TASK_STATUS
  id: string
}

export interface IInformationData {
  title: string
  description: string
  status: TASK_STATUS
  reminderDate: Date
  dueDate: Date
  listId: string
  assignedPersonId: string
  notes?: string
  subTasks?: ISubTask[]
}

export interface IInformationForm {
  title: string
  description: string
  status: TASK_STATUS
  reminderDate: Date
  dueDate: Date
  listId?: string
  assignedPersonId?: string
  notes?: string
}

export interface IUpdateTask {
  title: string
  description: string
  status: TASK_STATUS
  reminderDate: Date
  dueDate: Date
  listId?: string
  assignedPersonId?: string
}

export interface ISubtasksForm {
  title: string
  dueDate: Date
  status?: TASK_STATUS
}

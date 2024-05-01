import * as yup from 'yup'

export const informationFormSchema = yup.object().shape({
  status: yup.string().required('Status is required.'),
  title: yup.string().required('Task title is required.'),
  description: yup.string().nullable(),
  dueDate: yup.date().required('Date is required.'),
  reminderDate: yup.date().nullable(),
  listId: yup.string(),
  assignedPersonId: yup.string(),
})

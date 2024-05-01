import * as yup from 'yup'

export const dateModalFormSchema = yup.object().shape({
  title: yup.string().required('Task title is required.'),
  listId: yup.string().required('List is required.'),
  dueDate: yup.date().required('Date is required.')
})

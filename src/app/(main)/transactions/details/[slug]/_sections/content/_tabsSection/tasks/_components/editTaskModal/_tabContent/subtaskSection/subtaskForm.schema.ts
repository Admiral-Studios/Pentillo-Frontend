import * as yup from 'yup'

export const subtaskFormSchema = yup.object().shape({
  title: yup.string().required('Sub-task title is required.'),
  dueDate: yup.date().required().required('Sub-task date is required.'),
})

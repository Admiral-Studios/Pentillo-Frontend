import * as yup from 'yup'

export const addNewFormSchema = yup.object().shape({
  firstName: yup.string().required().min(4).max(40).label('First name'),
  lastName: yup.string().required().min(4).max(40).label('Last name'),
  phone: yup.string().label('Phone'),
  category: yup.string().required().label('Category'),
  email: yup.string().email().required().label('Email'),
})

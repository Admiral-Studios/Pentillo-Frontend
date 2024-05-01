import { CssTextField, TextFieldWrapper } from '@/ui/components/styled'
import { TextFieldProps } from '@mui/material'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import eyeClosedIcon from '../../assets/icons/eye-close-icon.svg'

// ? Type of Props the FormInput will receive
type FormInputProps = {
  name: string
  type?: string
  height?: string
} & TextFieldProps

const FormInput: FC<FormInputProps> = ({
  name,
  type = 'text',
  height = '40px',
  label,
  variant = 'outlined',
  error,
  ...otherProps
}) => {
  const [currentType, setCurrentType] = useState<string>(type)
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const toggleTypePassword = () =>
    setCurrentType((prevState) =>
      prevState === 'password' ? 'text' : 'password',
    )

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (
        <TextFieldWrapper>
          <p
            style={{
              margin: 0,
              fontWeight: '400',
              fontSize: '14px',
              color: '#040404',
              lineHeight: '16.8px',
            }}
          >
            {label}
          </p>
          <CssTextField
            {...field}
            {...otherProps}
            variant={variant}
            type={currentType}
            sx={{ mb: '1.5rem' }}
            error={!!errors[name]}
            height={height}
            helperText={
              errors[name] ? (errors[name]?.message as unknown as string) : ''
            }
          />{' '}
          {type === 'password' && (
            <Image
              src={eyeClosedIcon}
              alt='Eye closed'
              onClick={toggleTypePassword}
            />
          )}
        </TextFieldWrapper>
      )}
    />
  )
}

export default FormInput

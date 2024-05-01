'use client'
import { FormControl, IconButton, Input, InputAdornment, TextFieldProps } from "@mui/material";
import { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type PasswordInputProps = {
  name: string;
} & TextFieldProps;

const PasswordInput: FC<PasswordInputProps> = ({ name, ...otherProps }) => {
  // ? Utilizing useFormContext to have access to the form Context
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <FormControl
        
        >
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
    />
  );
};

export default PasswordInput;

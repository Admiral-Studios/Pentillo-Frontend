import FormInput from "@/components/formInput/FormInput";
import { ButtonsContainer, StyledButton } from "@/ui/components/styled";
import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";

export const ForgotStepOne = () => {
  return (
    <Box>
      <FormInput
        label="Enter your Email and we will send you a reset"
        type="email"
        name="email"
        focused
        required
      />
      <ButtonsContainer sx={{ paddingTop: "32px" }}>
        <Link href={"/sign-in"} style={{width: '100%'}}>
          <StyledButton variant="outlined">Return to Login</StyledButton>
        </Link>
        <StyledButton
          sx={{ color: "#FFFFFF" }}
          variant="contained"
          type="submit"
        >
          Reset the password
        </StyledButton>
      </ButtonsContainer>
    </Box>
  );
};

import FormInput from "@/components/formInput/FormInput";
import {
  ButtonsContainer,
  StyledButton,
} from "@/ui/components/styled";
import { theme } from "@/ui/theme";
import { Box, Typography } from "@mui/material";
import React from "react";

export const ForgotStepTwo = ({
  handler,
  resendCode,
  email
}: {
  handler: (step: number) => void;
  resendCode: () => void;
  email: string
}) => {
  return (
    <Box>
      {" "}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "28px", paddingBottom: '28px' }}>
        <Box>
          <Typography component="p" color="#AAA" sx={{ textAlign: "center" }}>
            We sent verification code to{" "}
            <span style={{ color: "#717171" }}>{email}</span>
          </Typography>{" "}
          <Typography component="p" color="#AAA" sx={{ textAlign: "center" }}>
            Please, check your inbox and enter the code.
          </Typography>
        </Box>

        <FormInput
          label="Enter 4-digits code"
          type="text"
          name="code"
          focused
          required
        />
      </Box>{" "}
      <Typography
        color="#AAA"
        sx={{
          fontSize: "18px",
          padding: "0 0 30px 0",
          textAlign: "center",
          width: "100%",
        }}
      >
        Didn’t receive the code?
        <span
          onClick={resendCode}
          style={{
            color: theme.palette.primary.main,
            marginLeft: "16px",
            cursor: "pointer",
          }}
        >
          Recent the code
        </span>
      </Typography>
      <ButtonsContainer>
        <StyledButton variant="outlined" onClick={() => handler(1)}>
          Edit Email Address
        </StyledButton>
        <StyledButton
          sx={{ color: "#FFFFFF" }}
          variant="contained"
          type="submit"
        >
          Confirm
        </StyledButton>
      </ButtonsContainer>
    </Box>
  );
};

import FormInput from "@/components/formInput/FormInput";
import { ButtonsContainer, StyledButton } from "@/ui/components/styled";
import { Box, Typography } from "@mui/material";
import React from "react";

export const ForgotStepThree = () => {
  return (
    <Box>
      {" "}
      <Box sx={{ paddingBottom: "28px" }}>
        <Typography component="p" color="#AAA" sx={{ textAlign: "center" }}>
          We sent verification code to{" "}
          <span style={{ color: "#717171" }}>jonsnow@gmail.com.</span>
        </Typography>{" "}
        <Typography component="p" color="#AAA" sx={{ textAlign: "center" }}>
          Please, check your inbox and enter the code.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <FormInput
          type="password"
          label="New Password"
          name="password"
          required
          focused
        />
        <FormInput
          type="password"
          label="Confirm Password"
          name="cpassword"
          required
          focused
        />
      </Box>
      <ButtonsContainer sx={{ paddingTop: "25px" }}>
        <StyledButton
          sx={{ color: "#FFFFFF" }}
          type={"submit"}
          variant="contained"
        >
          Confirm
        </StyledButton>
      </ButtonsContainer>
    </Box>
  );
};

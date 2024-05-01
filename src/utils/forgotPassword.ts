// @ts-nocheck
import { forgotPasswordFormSchema, forgotPasswordFormSchemaFirstStep, forgotPasswordFormSchemaSecondStep, forgotPasswordFormSchemaThirdStep } from "./schemas/forgot-password";
import * as yup from "yup";
import { IForgotPasswordFormInput, IForgotPasswordFormInputFirstStep } from "@/components/types";

export const handleText = (step: number) => {
  switch (step) {
    case 1:
      return "Reset the password";
    case 2:
      return "Verify it's you";
    case 3:
      return "Change password";
    default:
      return "Reset the password";
  }
};

export const handleSchemas = (step: number): yup.ObjectSchema<IForgotPasswordFormInput> => {
  switch (step) {
    case 1:
      return forgotPasswordFormSchemaFirstStep;
    case 2:
      return forgotPasswordFormSchemaSecondStep ;
    case 3:
      return forgotPasswordFormSchemaThirdStep;
    default:
      return forgotPasswordFormSchema;
  }
}

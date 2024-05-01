import * as yup from 'yup'
export const payoutFormSchema = yup.object().shape({
  broker: yup.number().positive().integer().nullable().label('Broker'),
  teamLead: yup.number().positive().integer().nullable().label('Team Lead'),
  primaryAgent: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('Primary Agent'),
  goAgent: yup.number().positive().integer().nullable().label('Go-Agent'),
  referral: yup.number().positive().integer().nullable().label('Referral'),
  firstAssistant: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('TC/Assistant 1'),
  secondAssistant: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('TC/Assistant 2'),
    agentCommission: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('Agent Commission %'),
  estimatedGrossPayout: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('Estimated Gross Payout'),
  actualGrossPayout: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('Actual Gross Payout'),
  commissionNote: yup
    .number()
    .positive()
    .integer()
    .nullable()
    .label('Commission Note'),
})

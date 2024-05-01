export enum CATEGORY {
  BUYER = 'Buyer',
  SELLER = 'Seller',
  LEDER = 'Leder',
  TRANSACTION_COORDINATOR = 'Transaction coordinator',
  ATTORNEY = 'Attorney',
}

export enum TASK_STATUS {
  DONE = 'Done',
  IN_PROCESS = 'In process',
  NEW = 'New',
  ON_HOLD = 'On Hold',
}

export enum SIDE {
  DUAL = 'Dual',
  PURCHASE = 'Purchase',
  LISTING = 'Listing',
}

export enum SOURCE {
  CLIENT = 'Client',
  REFERRAL = 'Referral',
}

export enum PROPERTY_TYPE {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  LAND = 'Land',
  MULTI_FAMILY = 'Multi family',
  RENTAL = 'Rental',
  CONDO = 'Condo',
  MOBILE_HOME = 'Mobile home',
}

export enum LIST_TYPE {
  DUAL = 'Dual',
  PURCHASE = 'Purchase',
  LISTING = 'Listing',
}

export enum STATUS {
  UNDER_CONTRACT = 'Under contract',
  TERMINATED = 'Terminated',
  PENDING = 'Pending',
  PRE_LISTING = 'Pre listing',
  COMING_SOON = 'Coming soon',
  ACTIVE = 'Active',
  CLOSED = 'Closed',
  WITHDRAWN = 'Withdrawn',
  EXPIRED = 'Expired',
}

export enum OCCUPANCY {
  VACANT = 'Vacant',
  OCCUPIED = 'Occupied',
}

export enum HOA_FREQUENCY {
  WEEKLY = 'Weekly',
  BI_WEEKLY = 'Bi Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
}

export enum TRANSACTION_PARTICIPANT {
  GO_AGENT = 'goAgent',
  PRIMARY_AGENT = 'primaryAgent',
  FIRST_ASSISTANT = 'firstAssistant',
  SECOND_ASSISTANT = 'secondAssistant',
  BUYERS_AND_SELLERS = 'buyersAndSellers',
}

export enum SUBCRIPTION_PLAN {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum TYPE {
  DOCUMENTS = 'DOCUMENTS',
  TASKS = 'TASKS',
  DATES = 'DATES',
}

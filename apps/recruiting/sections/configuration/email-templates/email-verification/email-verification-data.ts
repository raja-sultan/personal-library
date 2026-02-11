interface emailVerificationTypes {
  id: number;
  title?: string;
  description?: string;
  link?: any;
}

export const emailVerificationData: emailVerificationTypes[] = [
  {
    id: 1,
    title: `Enter your company's email address domain`,
    description: `The “domain” is the part of your organization’s email address that comes after the”@” sign. (1.e. for the email johmdoe@gmail.com, the domain is ”gmail.com”)`,
  },
  {
    id: 2,
    title: `Email your IT department`,
    description: `Send this email to your department and they’ll be able to take care of the rest.`,
  },
];

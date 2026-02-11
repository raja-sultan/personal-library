interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
}

interface LoginCredentials {
  email: string;
  password: string;
}
interface ChangePasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number | string;
  allowedCompany?: string[];
  companyName: string | null;
  companySize: string | null;
  country: string | null;
  companyNo: string | number;
  CompanyAddress: string;
  postalCode: string | number;
}

type SetAuthTokenAction = PayloadAction<AuthState>;
type LoginAction = PayloadAction<AuthState>;

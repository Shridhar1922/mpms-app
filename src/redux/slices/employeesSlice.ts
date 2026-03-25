import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payment {
  id: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  amount: string;
  currency: string;
  status: string;
  paymentMethod: string;
  purpose: string;
  description: string | null;
  bank: string | null;
  wallet: string | null;
  vpa: string | null;
  cardLast4: string | null;
  cardNetwork: string | null;
  receiptNumber: string | null;
  invoiceNumber: string | null;
  refundedAmount: string;
  razorpayRefundId: string | null;
  refundedAt: string | null;
  errorCode: string | null;
  errorDescription: string | null;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  failedAt: string | null;
  deletedAt: string | null;
}

interface User {
  id: string;
  name: string;
}

interface Employer {
  id: string;
}

export interface Employee {
  id: string;
  employeeEmail: string;
  employeePhone: string;
  permanentAddress?: string;
  currentAddress?: string;
  aadharCardNumber?: string;
  panCardNumber?: string;
  bankAccountNumber?: string;
  bankName?: string;
  ifscCode?: string;
  bankBranch?: string;
  country?: string;
  state?: string;
  designation?: string;
  department?: string;
  passportPhotoURL?: string;
  aadharCardPhotoFrontURL?: string;
  aadharCardPhotoBackURL?: string;
  panCardFrontURL?: string;
  panCardBackURL?: string;
  passbookOrCancelledChequeURL?: string;
  addressProof?: string;
  allowComments?: boolean;
  comment?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  startDate?: string;
  dueDate?: string;
  status?: 'active' | 'inactive';
  employeeCode?: string;
  joiningDate?: string;
  salary?: string;
  weekelyOffDay?: string | null;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  onboardingPaymentVerified?: boolean;
  employer?: Employer;
  user: User;
  payments?: Payment[];
  // Legacy fields for backward compatibility
  name?: string;
  email?: string;
  phone?: string;
}

export interface EmployeesState {
  list: Employee[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  list: [],
  total: 0,
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.list = action.payload;
      state.total = action.payload.length;
    },
    setEmployeesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEmployeesError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearEmployees: (state) => {
      state.list = [];
      state.total = 0;
      state.error = null;
    },
  },
});

export const { setEmployees, setEmployeesLoading, setEmployeesError, clearEmployees } =
  employeesSlice.actions;
export default employeesSlice.reducer;

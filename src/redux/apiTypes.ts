import Config from 'react-native-config';

console.log('Config', Config);

export const BASE_URL = Config.BASE_URL;
console.log('BASE_URL..', BASE_URL);

export const API_ENDPOINT_LOGIN = '/api/auth/login';
export const API_ENDPOINT_REFRESH_TOKEN = '/api/auth/refresh';
export const API_ENDPOINT_HOLIDAYS = '/api/holidays';
export const API_ENDPOINT_CHECKIN = '/api/attendances';
export const API_ENDPOINT_CHECKOUT = '/api/attendances';
export const API_ENDPOINT_ATTENDANCE_BY_EMPLOYEE = '/api/attendances/get-all-for-employee-by';
export const API_ENDPOINT_EMPLOYEES = '/api/employees';
export const API_ENDPOINT_EMPLOYERS = '/api/employers';

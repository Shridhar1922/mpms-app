import Config from 'react-native-config';

console.log('Config', Config);

export const BASE_URL = Config.API_URL;

export const API_ENDPOINT_LOGIN = 'auth/login';

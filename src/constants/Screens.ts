import { ServicesScreen } from 'screens/employer/services/ServicesScreen';

export const Screens = {
  Auth: {
    LOGIN: 'LogInScreen',
  },

  Main: {
    TABS: 'MainApp',
    SPLASH: 'SplashScreen',
    HOME: 'HomeScreen',
    USER_LIST: 'UserListScreen',
    DASHBOARD: 'DashboardScreen',
    PROFILE: 'ProfileScreen',
    SERVICES: 'ServicesScreen',
    SETTINGS: 'SettingsScreen',
  },
} as const;

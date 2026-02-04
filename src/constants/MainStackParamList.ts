import { Screens } from './Screens';

export type BottomTabParamList = {
  [Screens.Main.DASHBOARD]: undefined;
  [Screens.Main.PROFILE]: undefined;
  [Screens.Main.SETTINGS]: undefined;
};
export type MainStackParamList = {
  [Screens.Main.SPLASH]: undefined;
  [Screens.Auth.LOGIN]: undefined;
  [Screens.Main.HOME]: undefined;
  [Screens.Main.USER_LIST]: undefined;
  [Screens.Main.TABS]: {
    screen?: keyof BottomTabParamList;
  };
  [Screens.Main.DASHBOARD]: undefined;
  [Screens.Main.PROFILE]: { userId: string } | undefined;
  [Screens.Main.SERVICES]: undefined;
  [Screens.Main.SETTINGS]: undefined;
};

// This magic block makes useNavigation() work everywhere without extra imports
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

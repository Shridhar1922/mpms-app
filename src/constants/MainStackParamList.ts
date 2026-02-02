import { Screens } from './Screens';

export type MainStackParamList = {
  [Screens.Main.Splash]: undefined;
  [Screens.Main.HOME]: undefined;
  [Screens.Main.USER_LIST]: undefined;
};

// This magic block makes useNavigation() work everywhere without extra imports
declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}

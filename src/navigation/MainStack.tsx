import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LogInScreen } from '../screens/auth/LogInScreen';
// import { UserList } from '../screens/UserList';
import { Screens } from '../constants/Screens';
import SplashScreen from '../screens/splash/SplashScreen';
import BottomTabNavigation from './bottom-tabs/BottomTabNavigation';
import { DashboardScreen } from '../screens/employer/dashboard/DashboardScreen';

const Stack = createStackNavigator();

const MainStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={Screens.Main.SPLASH} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.Main.SPLASH}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Auth.LOGIN}
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name={Screens.Main.DASHBOARD} component={DashboardScreen} /> */}
      <Stack.Screen name={Screens.Main.TABS} component={BottomTabNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStack;

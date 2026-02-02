import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { UserList } from '../screens/UserList';
import { Screens } from '../constants/Screens';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const MainStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={Screens.Main.Splash} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screens.Main.Splash}
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Main.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={Screens.Main.USER_LIST} component={UserList} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStack;

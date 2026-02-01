import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { UserList } from '../screens/UserList';
import { Screens } from '../constants/Screens';

const Stack = createStackNavigator();

const MainStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name={Screens.Main.HOME} component={HomeScreen} />
      <Stack.Screen name={Screens.Main.USER_LIST} component={UserList} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStack;

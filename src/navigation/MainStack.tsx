import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LogInScreen } from '../screens/auth/LogInScreen';
// import { UserList } from '../screens/UserList';
import { Screens } from '../constants/Screens';
import SplashScreen from '../screens/splash/SplashScreen';
import { AppDrawerNavigation } from './AppDrawerNavigation';
import EditProfileScreen from '../screens/employee/profile/EditProfileScreen/EditProfileScreen';
import { AttendanceScreen } from '../screens/employee/attendance/AttendanceScreen';
import { HolidayScreen } from '../screens/employee/holiday/HolidayScreen';
import { MyEmployeesScreen } from '../screens/employer/employees/MyEmployeesScreen';
import { AddEmployeeScreen } from '../screens/employer/AddEmployee/AddEmployeeScreen';

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
      <Stack.Screen name={Screens.Main.TABS} component={AppDrawerNavigation} />
      <Stack.Screen name={Screens.Main.EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen name={Screens.Services.ATTENDANCE_REQUEST} component={AttendanceScreen} />
      <Stack.Screen name={Screens.Services.HOLIDAY} component={HolidayScreen} />
      <Stack.Screen name={Screens.Services.MY_EMPLOYEES} component={MyEmployeesScreen} />
      <Stack.Screen name={Screens.Services.ADD_EMPLOYEE} component={AddEmployeeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStack;

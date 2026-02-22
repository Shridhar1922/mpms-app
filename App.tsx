/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import MainStack from './src/navigation/MainStack';
import RNBootSplash from 'react-native-bootsplash';
import { ToastProvider } from './src/components/Toast/ToastContext/ToastContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    RNBootSplash.hide();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MainStack />
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

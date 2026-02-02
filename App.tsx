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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const init = async () => {
      // any async work like auth, storage, etc.
    };

    init().finally(() => {
      RNBootSplash.hide();
    });
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <MainStack />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

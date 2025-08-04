// App.js
import { Provider } from 'react-redux';
import store from './src/store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';


export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
          <MainNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

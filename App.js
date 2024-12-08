import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './App/Main';
import Welcome from './App/Welcome';



const Stack = createNativeStackNavigator();



export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './App/Welcome';
import SignUp from './App/SignUp';
import Login from './App/Login';
import Main from './App/Main';
import Layout from './App/_layout';
import HomeIcon from './assets/icons/Home';
import Home from './App/(Main)/Home';



const Stack = createNativeStackNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Home" component={Home} />

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

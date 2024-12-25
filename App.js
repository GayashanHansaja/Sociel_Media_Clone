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
import Notification from './App/(Main)/notification';
import NewPost from './App/(Main)/NewPost';
import Profile from './App/(Main)/profile';
import EditProfile from './App/(Main)/EditProfile';
import { AuthProvider } from './context/AuthContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Warning: TNodeChildrenRenderer: Support for defaultProps will be removed',
  'Warning: TRenderEngineProvider: Support for defaultProps will be removed',
  'Warning: MemoizedTNodeRenderer: Support for defaultProps will be removed',
]);


const Stack = createNativeStackNavigator();



export default function App() {

  return (
    <AuthProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="welcome">
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="welcome" component={Welcome} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="Layout" component={Layout} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen name="newPost" component={NewPost} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="editProfile" component={EditProfile} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
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

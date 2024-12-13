import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import { getUserDAta } from '../services/userServices';

const Stack = createNativeStackNavigator();

const MainLayout = () => {
  const { setAuth,setUserData } = useAuth();
  const navigation=useNavigation();

  useEffect(() => {
    
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session?.user.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user)
        navigation.navigate('Home');
      }else{
        setAuth(null)
        navigation.navigate('welcome');
      }
      
      
    });

  
  }, []);
  const updateUserData=async (user)=>{
    let res=await getUserDAta(user?.id);
    if (res.success) setUserData(res.data)
  }
  /* return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  ); */
};

const Layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default Layout;

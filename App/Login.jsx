import { View, Text, SafeAreaView, StatusBar, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '../assets/icons/Icon';
import Input from '../components/Input';
import Button from '../components/Button';
import { hp, wp } from '../helpers/common';
import { theme } from '../helpers/theme';
import { supabase } from '../lib/supabase';
import Layout from './_layout';
import ScreenWrapper from '../components/ScreenWrapper';
import BackButton from '../components/BackButton';

const Login = () => {
  const navigation = useNavigation();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [Loading, setLoading] = useState(false);

  const onsubmit = async() => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();
    setLoading(true);

    const {error}= await supabase.auth.signInWithPassword({
      email,
      password,

    })

    setLoading(false);

    console.log('error', error);

    if(error){
      Alert.alert('Login',error.message);
    }else {
      navigation.navigate('Layout');
    }
  }

  return (
    <ScreenWrapper /* style={styles.SafeAreaView} */>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={{fontSize:hp(1.5),color:theme.colors.text}}>Please login to continue!</Text>

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your Email"
            onChangeText={(value) => (emailRef.current = value)}
          />

          <Input
            icon={<Icon name="lock" size={26} />}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <Button  title="Login" loading={Loading} onPress={onsubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={styles.footerText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
/*   SafeAreaView: {
    flex: 1,
    paddingHorizontal: wp(6),
  }, */
  container: {
    flex: 1,
    gap:45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    /* marginTop: 20, */
  },
  form: {
    gap: 25,

  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.accent,
    fontSize: 14,
  },
});

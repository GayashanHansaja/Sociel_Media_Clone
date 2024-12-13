import { View, Text, SafeAreaView, StatusBar, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '../assets/icons/Icon';
import Input from '../components/Input';
import Button from '../components/Button';
import { hp, wp } from '../helpers/common';
import { theme } from '../helpers/theme';
import { supabase } from '../lib/supabase';

const SignUp = () => {
  const navigation = useNavigation();
  const UsernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [Loading, setLoading] = useState(false);

  const onsubmit =async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    let name = UsernameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {data:{session},error} = await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          name
        }
      }
    });

    setLoading(false);

    console.log('session',session);
    console.log('error',error);

    if (error) {
      Alert.alert('Sign Up', error.message);
      
      return;
    }
  };
    // Further login logic
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {/* Welcome */}
          <View>
            <Text style={styles.welcomeText}>Let's,</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>
  
          {/* Form */}
          <View style={styles.form}>
            <Text>Please fill the details to create a acoount</Text>

            <Input
              icon={<Icon name="user" size={26} />}
              placeholder="Enter your Username"
              onChangeText={(value) => (UsernameRef.current = value)}
            />
  
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Enter your Email"
              onChangeText={(value) => (emailRef.current = value)}
            />
  
            <Input
              icon={<Icon name="lock" size={26} />}
              placeholder="Set-New Password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
            />

            <Input
              icon={<Icon name="lock" size={26} />}
              placeholder="Re-Enter Password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
            />
  
            <Button title="Sign Up" loading={Loading} onPress={onsubmit} />
          </View>
  
          {/* Footer */}
          <View style={styles.footer}>
            <Text>Aleready have an Account?</Text>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text style={styles.footerText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default SignUp;
  
  const styles = StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      paddingHorizontal: wp(6),
    },
    container: {
      flex: 1,
      gap:45
    },
    welcomeText: {
      fontSize: 50,
      fontWeight: theme.fonts.bold,
      color: theme.colors.text,
      marginTop: 20,
    },
    form: {
      gap: 20,
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
      
    },
    footerText: {
      textAlign: 'center',
      color: theme.colors.accent,
      fontSize: 14,
    },
  });
  
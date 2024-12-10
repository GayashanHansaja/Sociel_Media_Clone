import { View, Text, SafeAreaView, StatusBar, Pressable, Alert, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '../assets/icons/Icon';
import Input from '../components/Input';
import Button from '../components/Button';
import { hp, wp } from '../helpers/common';
import { theme } from '../helpers/theme';

const Login = () => {
  const navigation = useNavigation();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const repasswordRef = useRef('');
  const [Loading, setLoading] = useState(false);

  const onsubmit = () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    // Further login logic
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Welcome */}
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text>Please login to continue!</Text>

          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your Email"
            onChangeText={(value) => (emailRef.current = value)}
          />

          <Input
            icon={<Icon name="lock" size={26} />}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={(value) => (repasswordRef.current = value)}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <Button title="Login" loading={Loading} onPress={onsubmit} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('signup')}>
            <Text style={styles.footerText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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

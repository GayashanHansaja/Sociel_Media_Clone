import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { wp ,hp } from '../helpers/common';
import Button from '../components/Button';
import { theme } from '../helpers/theme';
import ScreenWrapper from '../components/ScreenWrapper';



const Welcome = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>

        {/* welcome Image */}
        <Image source={require('../assets/welcome1.png')} style={styles.welcomeImg} />
       {/*  <Text style={styles.title}>Welcome Screen</Text>
        <Button title="Back to Main" onPress={() => navigation.goBack()} /> */}
        <View style={{gap:20}}>
          <Text style={styles.title}>Threadify</Text>
          <Text style={styles.punchline}>Capturing the heartbeat of your social world!</Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Button title="Get Started!" onPress={() => navigation.navigate('signup')} />

        </View>

        <View>
          <Text style={[styles.loginText, {color:theme.colors.text}]
          }>Already have an account? <Text style={{color:theme.colors.accent}} onPress={() => navigation.navigate('login')}>Login</Text></Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
 /*  safeArea: { flex: 1, backgroundColor: 'white' ,paddingHorizontal:wp(5)}, */
  container: { flex: 1,backgroundColor:'white', alignItems: 'center',paddingHorizontal:wp(4),justifyContent:'space-around' },
  title: { fontSize: 45, /* marginBottom: 10 , */textAlign:'center',fontWeight:theme.fonts.bold },
  welcomeImg: { width: wp(100), height: hp(40) /* ,marginBottom:hp(5) */},
  punchline: { fontSize: 18,/* marginBottom: hp(5) , */ textAlign: 'center',paddingHorizontal:wp(5) },
  footer: { width: '100%', paddingHorizontal: 20/*  marginBottom: hp(2) */ },
});

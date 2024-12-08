import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { wp ,hp } from '../helpers/common';
import Button from '../components/Button';


const Welcome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style='dark' />
      <View style={styles.container}>
        {/* welcome Image */}
        <Image source={require('../assets/welcome1.png')} style={styles.welcomeImg} />
       {/*  <Text style={styles.title}>Welcome Screen</Text>
        <Button title="Back to Main" onPress={() => navigation.goBack()} /> */}
        <View>
          <Text style={styles.title}>BEAVER</Text>
          <Text style={styles.punchline}>Lets's Hook Up!</Text>
        </View>
        {/* footer */}
        <View style={styles.footer}>
          <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' ,paddingHorizontal:wp(5)},
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 64, marginBottom: 10 ,fontWeight:'bold' },
  welcomeImg: { width: wp(100), height: hp(50) ,marginBottom:hp(5)},
  punchline: { fontSize: 20,marginBottom: hp(5) , textAlign: 'center' },
  footer: { width: '80%', paddingHorizontal: 20, marginBottom: hp(5) },
});

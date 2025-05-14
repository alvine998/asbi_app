import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import useUserStore from '../store/useUserStore';

export default function Splash({navigation}: any) {
  const {user} = useUserStore();
  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    }, 1500);
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Image
        source={require('../assets/images/logo.jpeg')}
        width={300}
        height={200}
        style={{width: 250, height: 200}}
      />
    </View>
  );
}

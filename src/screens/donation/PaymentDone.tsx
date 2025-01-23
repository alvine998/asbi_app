import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';

export default function PaymentDone({navigation}: any) {
  useEffect(() => {
    // Create a handler to block the back button
    const onBackPress = () => {
      navigation.navigate('Home');
      return true; // Return true to prevent the default back action
    };

    // Add back handler listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    // Clean up the listener when component unmounts
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '500',
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
        }}>
        Terima Kasih Telah Berdonasi Melalui Donasiqu
      </Text>
      <Image
        source={require('../../assets/images/thankyou.jpg')}
        style={{width: 300, height: 300}}
      />
      <Text
        style={{
          fontSize: 14,
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
        }}>
        Bukti pembayaran akan kami kirimkan ke email anda.
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{
          backgroundColor: '#76c7c0',
          padding: 10,
          borderRadius: 10,
          width: '100%',
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
          Selesai
        </Text>
      </TouchableOpacity>
    </View>
  );
}

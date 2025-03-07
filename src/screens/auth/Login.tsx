import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {CONFIG} from '../../config';
import {handleChange} from '../../lib/utils';
import useUserStore from '../../store/useUserStore';

export default function Login({navigation}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [payload, setPayload] = useState<any>();
  const setUser = useUserStore((state: any) => state.setUser);
  const {user} = useUserStore();

  useEffect(()=>{
    if(user){
      navigation.navigate("Home")
    }
  },[])

  const onSubmit = async () => {
    setLoading(true);
    try {
      const payloads = {
        ...payload,
      };
      const result = await axios.post(
        CONFIG.BASE_URL_API + '/users/login',
        payloads,
        {
          headers: {'bearer-token': 'donasiquapi'},
        },
      );
      if (result?.data) {
        await axios.post(
          CONFIG.BASE_URL_API + '/sendmail',
          {to: result?.data?.user?.email},
          {
            headers: {'bearer-token': 'donasiquapi'},
          },
        );
      }
      setUser(result?.data?.user)
      setLoading(false);
      Alert.alert('Login Berhasil');
      navigation.navigate('Otp');
    } catch (error: any) {
      setLoading(false);
      console.log(error.response);
      setErrorMessage(
        error?.response.data.error_message || error?.response.data.message,
      );
    }
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView contentContainerStyle={{paddingVertical: 200}}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={{width: 250, height: 150}}
        />
        <View
          style={{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
          }}>
          <TextInput
            placeholder="Email / No Telepon"
            placeholderTextColor={'gray'}
            style={{color: 'black'}}
            onChangeText={e => {
              handleChange(e, 'identity', payload, setPayload);
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 10,
          }}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={'gray'}
            style={{color: 'black'}}
            onChangeText={e => {
              handleChange(e, 'password', payload, setPayload);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 5,
          }}>
          <TouchableOpacity>
            <Text style={{color: '#808080', fontSize: 12}}>Lupa password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            onSubmit();
          }}
          style={{
            width: '100%',
            height: 40,
            borderRadius: 10,
            backgroundColor: '#76c7c0',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'white'}}>
            {loading ? 'Memproses...' : 'Masuk'}
          </Text>
        </TouchableOpacity>
        {errorMessage !== '' ? (
          <Text style={{color: 'red', textAlign: 'center', marginTop: 5}}>
            {errorMessage}
          </Text>
        ) : (
          <></>
        )}

        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => {
            navigation.navigate('Registration');
          }}>
          <Text style={{color: '#60af29', fontSize: 14, textAlign: 'center'}}>
            Belum memiliki akun? Daftar disini
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

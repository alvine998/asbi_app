import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function Login({navigation}: any) {
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
          onPress={() => {
            navigation.navigate('Otp');
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
          <Text style={{color: 'white'}}>Masuk</Text>
        </TouchableOpacity>
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

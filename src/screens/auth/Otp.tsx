import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import axios from 'axios';
import {CONFIG} from '../../config';
import useUserStore from '../../store/useUserStore';

export default function Otp({navigation}: any) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRefs: any = useRef([]);
  const {user} = useUserStore();

  const handleChange = (value: any, index: number) => {
    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Allow only one digit
    setOtp(newOtp);

    // Focus on the next input if available
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        otp: otp.join(",").replaceAll(",", ""),
        email: user?.email,
        id: user?.id,
      };
      const result = await axios.post(
        CONFIG.BASE_URL_API + `/users/verification/otp`,
        payload,
        {
          headers: {
            "bearer-token": "donasiquapi"
          }
        }
      );
      setLoading(false);
      navigation.navigate('Home');
    } catch (error: any) {
      console.log(error);
      setLoading(false);
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
        paddingHorizontal: 50,
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Verifikasi Kode OTP
      </Text>
      <Text style={{marginTop: 10}}>
        Silahkan masukkan 6 digit kode OTP yang telah kami kirimkan melalui
        email
      </Text>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            value={digit}
            onChangeText={value => handleChange(value, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={ref => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>
      {errorMessage !== '' ? (
        <Text style={{color: 'red', textAlign: 'center', marginTop: 5}}>
          {errorMessage}
        </Text>
      ) : (
        <></>
      )}

      <TouchableOpacity
        onPress={() => {
          onSubmit();
        }}
        disabled={loading}
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
          {loading ? 'Memproses...' : 'Lanjutkan'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
});

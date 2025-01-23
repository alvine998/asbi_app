import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function Otp() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs: any = useRef([]);

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
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Verifikasi Kode OTP
      </Text>
      <Text style={{marginTop: 10}}>
        Silahkan masukkan 6 digit kode OTP yang telah kami kirimkan melalui email
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

      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          borderRadius: 10,
          backgroundColor: '#76c7c0',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,

        }}>
        <Text style={{color: 'white'}}>Lanjutkan</Text>
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

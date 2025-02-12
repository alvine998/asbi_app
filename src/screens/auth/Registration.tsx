import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export default function Registration({navigation}: any) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 40,
        paddingVertical: 100,
      }}>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        Pendaftaran
      </Text>
      <ScrollView style={{marginTop: 20}}>
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
            placeholder="Nama"
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
            placeholder="No Telepon"
            placeholderTextColor={'gray'}
            style={{color: 'black'}}
            keyboardType="phone-pad"
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
            placeholder="Email"
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
            placeholder="Tanggal Lahir"
            placeholderTextColor={'gray'}
            style={{color: 'black'}}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={{
            width: '100%',
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            flexDirection: 'column',
            gap: 5,
            alignItems: 'baseline',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: 'black'}}>{moment(date).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
        />
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
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={'gray'}
            style={{color: 'black'}}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
            onPress={handleCheckboxPress}>
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.label}>
            Dengan ini saya menyetujui{' '}
            <Text style={styles.link}>Syarat dan Ketentuan yang berlaku</Text>{' '}
            di DonasiQu
          </Text>
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
          <Text style={{color: 'white'}}>Daftar Sekarang</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop: 20}}>
          <Text style={{color: '#60af29', fontSize: 14, textAlign: 'center'}}>
            Sudah memiliki akun? Login disini
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

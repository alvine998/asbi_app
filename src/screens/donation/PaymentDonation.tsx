import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {formatThousand} from '../../lib/utils';

interface Payload {
  name: string;
  phone: string;
  email: string;
}

export default function PaymentDonation({navigation}: any) {
  const [amount, setAmount] = useState<string>('');
  const [anon, setAnon] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('bsi');
  const [payload, setPayload] = useState<Payload>({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: any, name: string) => {
    setPayload({
      ...payload,
      [name]: e,
    });
  };

  const handlePayment = () => {
    let amountFee = +amount?.replaceAll(',', '');
    if (amountFee < 10000) {
      return Alert.alert('Minimal Donasi Rp. 10.000');
    }
    if (!anon && (!payload.name || !payload.phone || !payload.email)) {
      return Alert.alert('Lengkapi Data Informasi Donatur');
    }
    navigation.navigate('PaymentConfirmation', {amount, paymentMethod});
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 100}}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <FontAwesome5Icon name="chevron-left" size={20} />
          <Text style={{color: 'black', fontSize: 20}}>Kembali</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Pembayaran Donasi
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              Nominal:
            </Text>
            <View style={{paddingHorizontal: 70, width: '100%', height: 50}}>
              <TextInput
                keyboardType="numeric"
                style={{
                  width: '100%',
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  color: 'black',
                  fontSize: 20,
                  height: 50,
                }}
                placeholder="Rp. 0"
                placeholderTextColor={'gray'}
                value={amount}
                onChangeText={e => {
                  setAmount(formatThousand(e));
                }}
              />
              {+amount?.replaceAll(',', '') < 10000 ? (
                <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
                  * Minimal Rp 10.000
                </Text>
              ) : (
                <></>
              )}
            </View>
          </View>

          <View style={{marginTop: 50}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Informasi Donatur
            </Text>
            <View
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                marginTop: 10,
                backgroundColor: anon ? '#dfdfdf' : '#fff',
              }}>
              <TextInput
                readOnly={anon}
                placeholder="Masukkan Nama"
                placeholderTextColor={'gray'}
                style={{color: 'black'}}
                onChangeText={e => handleChange(e, 'name')}
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
                backgroundColor: anon ? '#dfdfdf' : '#fff',
              }}>
              <TextInput
                readOnly={anon}
                placeholder="No Telepon"
                placeholderTextColor={'gray'}
                style={{color: 'black'}}
                keyboardType="phone-pad"
                maxLength={13}
                onChangeText={e => handleChange(e, 'phone')}
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
                backgroundColor: anon ? '#dfdfdf' : '#fff',
              }}>
              <TextInput
                readOnly={anon}
                placeholder="Email"
                placeholderTextColor={'gray'}
                style={{color: 'black'}}
                onChangeText={e => handleChange(e, 'email')}
              />
            </View>

            {/* Check Anonymous */}
            <View
              style={{
                marginTop: 10,
                paddingLeft: 10,
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setAnon(!anon);
                }}>
                {anon ? (
                  <FontAwesome5Icon
                    name="check-square"
                    size={20}
                    color={'green'}
                  />
                ) : (
                  <FontAwesome5Icon name="square" size={20} />
                )}
              </TouchableOpacity>
              <Text style={{fontSize: 12}}>
                Saya tidak ingin mencantumkan informasi
              </Text>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={{marginTop: 50}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              Metode Pembayaran
            </Text>
            <TouchableOpacity
              onPress={() => {
                setPaymentMethod('bsi');
              }}
              style={{
                backgroundColor: paymentMethod === 'bsi' ? '#76c7c0' : 'white',
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                borderWidth: 1,
                borderColor: paymentMethod === 'bsi' ? '#76c7c0' : '#ccc',
              }}>
              <Text
                style={{
                  color: paymentMethod === 'bsi' ? 'white' : 'black',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Transfer Bank BSI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPaymentMethod('mandiri');
              }}
              style={{
                backgroundColor:
                  paymentMethod === 'mandiri' ? '#76c7c0' : 'white',
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: paymentMethod === 'mandiri' ? '#76c7c0' : '#ccc',
              }}>
              <Text
                style={{
                  color: paymentMethod === 'mandiri' ? 'white' : 'black',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Transfer Bank Mandiri
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPaymentMethod('qris');
              }}
              style={{
                backgroundColor: paymentMethod === 'qris' ? '#76c7c0' : 'white',
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                borderWidth: 1,
                borderColor: paymentMethod === 'qris' ? '#76c7c0' : '#ccc',
              }}>
              <Text
                style={{
                  color: paymentMethod === 'qris' ? 'white' : 'black',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                QRIS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          zIndex: 999,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={handlePayment}
          style={{
            backgroundColor: '#76c7c0',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
            Bayar Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

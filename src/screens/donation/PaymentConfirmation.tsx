import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {formatThousand} from '../../lib/utils';

export default function PaymentConfirmation({navigation, route}: any) {
  const {amount, paymentMethod} = route.params;
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
        backgroundColor: 'white',
      }}>
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
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
          marginTop: 50,
        }}>
        Anda akan berdonasi sebesar {'\n'}Rp {formatThousand(amount)}
      </Text>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {paymentMethod == 'bsi' && (
          <Image
            source={require('../../assets/images/bsi.webp')}
            style={{width: 200, height: 200}}
          />
        )}
        {paymentMethod == 'qris' && (
          <Image
            source={require('../../assets/images/qris.jpeg')}
            style={{width: 300, height: 300}}
          />
        )}
        {paymentMethod == 'mandiri' && (
          <Image
            source={require('../../assets/images/mandiri.png')}
            style={{width: 250, height: 70}}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 14,
          marginTop: 10,
          marginBottom: 10,
          color: 'black',
          textAlign: 'center',
        }}>
        {paymentMethod == 'bsi' &&
          'Silahkan transfer ke rekening BSI : 123456789'}
        {paymentMethod == 'mandiri' &&
          'Silahkan transfer ke rekening Mandiri : 1234567890123'}
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PaymentDone');
        }}
        style={{
          backgroundColor: '#76c7c0',
          padding: 10,
          borderRadius: 10,
          width: '100%',
          marginTop: 10,
        }}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
          Lanjutkan
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ProgressBar} from '../../components/ProgressBar';

export default function DetailDonation({navigation, route}: any) {
  const {thumbnail, title, raised, target} = route.params;
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

        {/* Detail */}
        <View style={{marginTop: 10}}>
          <Image
            source={thumbnail}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              width: '100%',
              height: 250,
            }}
          />

          <ProgressBar reach={raised} target={target} />

          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: 'black',
              textAlign: 'justify',
            }}>
            Deskripsi:{'\n'}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
      {/* Button Donation Now */}
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
          onPress={() => navigation.navigate('PaymentDonation')}
          style={{
            backgroundColor: '#76c7c0',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
            Donasi Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

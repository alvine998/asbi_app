import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../components/BackButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';

export default function ConfirmCreateDonation({navigation, route}: any) {
  const {category, payload} = route.params;
  const [agree, setAgree] = useState<Boolean>(false);
  return (
    <View style={{padding: 20, paddingBottom: 100}}>
      <BackButton navigation={navigation} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
        }}>
        Konfirmasi Galang Dana
      </Text>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Judul:
          </Text>
          <View
            style={{
              marginTop: 16,
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{payload?.title}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Deskripsi:
          </Text>
          <View
            style={{
              marginTop: 16,
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{payload?.description}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Target:
          </Text>
          <View
            style={{
              marginTop: 16,
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>Rp {payload?.target}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Durasi:
          </Text>
          <View
            style={{
              marginTop: 16,
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{payload?.days} Hari</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width: '100%',
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Rincian:
          </Text>
          <View
            style={{
              marginTop: 16,
              borderBottomWidth: 1,
              width: '100%',
            }}>
            <Text>{payload?.detail}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',
            gap: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Foto:
          </Text>
          <Image
            source={{uri: payload?.image}}
            style={{
              width: '80%',
              height: 300,
              borderRadius: 10,
              marginLeft: 10,
            }}
          />
        </View>

        {/* Agreement */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => setAgree(!agree)}>
            {!agree ? (
              <FontAwesome5Icon name="square-o" color={'#808080'} size={30} />
            ) : (
              <FontAwesome5Icon name="check-square" color={'green'} size={30} />
            )}
          </TouchableOpacity>

          <Text style={{fontSize: 12, color: 'black'}}>
            Saya menyetujui kebijakan galang dana dari Donasiqu
          </Text>
        </View>

        {/* Button Next */}
        <TouchableOpacity
          onPress={()=>{navigation.navigate('Home')}}
          style={{
            width: '100%',
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: '#4CAF50',
            justifyContent: 'center',
          }}>
          <Text style={{marginLeft: 10, color: 'white'}}>Terbitkan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

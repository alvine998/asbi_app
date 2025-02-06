import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import BackButton from '../../../components/BackButton';

export default function ConfirmCreateDonation({navigation, route}: any) {
  const {category, payload} = route.params;
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
            width:"100%",
            gap:10
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
              width:"100%"
            }}>
            <Text>{payload?.title}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width:"100%",
            gap:10
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
              width:"100%"
            }}>
            <Text>{payload?.description}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width:"100%",
            gap:10
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
              width:"100%"
            }}>
            <Text>Rp {payload?.target}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width:"100%",
            gap:10
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
              width:"100%"
            }}>
            <Text>{payload?.days} Hari</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width:"100%",
            gap:10
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
              width:"100%"
            }}>
            <Text>{payload?.detail}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            width:"100%",
            gap:10,
            marginTop:20
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Foto:
          </Text>
          
        </View>
      </ScrollView>
    </View>
  );
}

import {View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../../components/BackButton';
import {formatThousand} from '../../../lib/utils';

export default function CreateDonation({navigation, route}: any) {
  const [payload, setPayload] = useState<any>();
  const {category} = route.params;
  const handleChange = (e: any, name: string) => {
    setPayload({
      ...payload,
      [name]: name == 'target' ? formatThousand(e) : e,
    });
  };
  return (
    <View style={{padding: 20, paddingBottom: 100}}>
      <BackButton navigation={navigation} />
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}>
          Galang Dana {category?.name}
        </Text>

        <View>
          {/* Input Title */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Judul</Text>
            <View
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextInput
                onChangeText={(e: any) => handleChange(e, 'title')}
                value={payload?.title}
                placeholder="Masukkan Judul Donasi"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                maxLength={100}
              />
            </View>
          </View>

          {/* Input Description */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Deskripsi</Text>
            <View
              style={{
                width: '100%',
                height: 100,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextInput
                onChangeText={(e: any) => handleChange(e, 'description')}
                value={payload?.description}
                placeholder="Masukkan Deskripsi Donasi"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Input Target */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Target</Text>
            <View
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextInput
                onChangeText={(e: any) => handleChange(e, 'target')}
                value={payload?.target}
                placeholder="Rp 0"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                keyboardType="number-pad"
              />
            </View>
            {payload?.target &&
              +payload?.target?.replaceAll(',', '') < 1000000 && (
                <Text style={{marginLeft: 10, color: 'red'}}>
                  Target Minimal Rp 1.000.000
                </Text>
              )}
          </View>

          {/* Input Day */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>
              Durasi (Hari)
            </Text>
            <View
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextInput
                onChangeText={(e: any) => handleChange(e, 'days')}
                value={payload?.days}
                placeholder="30/60/120/..."
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                keyboardType="number-pad"
              />
            </View>
          </View>

          {/* Input Detail */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>
              Rincian Penggunaan Dana
            </Text>
            <View
              style={{
                width: '100%',
                height: 100,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TextInput
                onChangeText={(e: any) => handleChange(e, 'detail')}
                value={payload?.detail}
                placeholder="Masukkan Rincian Penggunaan Dana"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>

          {/* Input Photo */}
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Upload Foto</Text>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 5,
                backgroundColor: '#3dcfcb',
                justifyContent:"center",
              }}>
              <Text style={{marginLeft: 10, color: 'white'}}>
                Upload Foto
              </Text>
            </TouchableOpacity>
          </View>

          {/* Button Next */}
          <TouchableOpacity
            onPress={()=>{navigation.navigate('ConfirmCreateDonation', {payload, category})}}
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: '#4CAF50',
                justifyContent:"center",
              }}>
              <Text style={{marginLeft: 10, color: 'white'}}>
                Selanjutnya
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

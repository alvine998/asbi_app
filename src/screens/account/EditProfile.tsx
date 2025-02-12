import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {formatThousand} from '../../lib/utils';
import DatePicker from 'react-native-date-picker';

export default function EditProfile({navigation, route}: any) {
  const [payload, setPayload] = useState<any>();
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: any, name: string) => {
    setPayload({
      ...payload,
      [name]: e,
    });
  };
  return (
    <View style={{padding: 20}}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <BackButton navigation={navigation} />
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '800'}}>
          Edit Profil
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10,
            marginTop: 20,
          }}>
          <TouchableOpacity>
            <FontAwesome5Icon name="user-circle" size={80} color="gray" />
          </TouchableOpacity>

          {/* Input Name */}
          <View style={{width: '100%'}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Nama Lengkap</Text>
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
                onChangeText={(e: any) => handleChange(e, 'name')}
                value={payload?.name}
                placeholder="Masukkan Nama Lengkap"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                maxLength={100}
              />
            </View>
          </View>

          {/* Input Email */}
          <View style={{width: '100%'}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>Email</Text>
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
                onChangeText={(e: any) => handleChange(e, 'email')}
                value={payload?.email}
                placeholder="Masukkan Email"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                maxLength={100}
              />
            </View>
          </View>

          {/* Input Phone */}
          <View style={{width: '100%'}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>No Telepon</Text>
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
                onChangeText={(e: any) => handleChange(e, 'phone')}
                value={payload?.phone}
                placeholder="Masukkan No Telepon"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                style={{color: 'black', width: '100%'}}
                maxLength={100}
              />
            </View>
          </View>

          {/* Input Date */}
          <View style={{width: '100%'}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>
              Tanggal Lahir
            </Text>
            <TouchableOpacity
            onPress={()=>{setOpen(true)}}
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'column',
                gap: 5,
                alignItems: 'baseline',
                justifyContent:"center",
                marginTop: 5,
              }}>
              {/* <TextInput
                onChangeText={(e: any) => handleChange(e, 'date')}
                value={payload?.date}
                placeholder="Masukkan Tanggal Lahir"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
                maxLength={100}
              /> */}
              <Text style={{color:"gray"}}>{date.toDateString()}</Text>
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
              mode='date'
            />
          </View>

          <View style={{width: '100%', marginTop: 20}}>
            <Button title="Simpan" color={'green'} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

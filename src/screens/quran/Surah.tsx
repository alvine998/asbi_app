import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {ISurah} from '../../types/surah';
import axios from 'axios';
import {useOnRefresh} from '../../hooks/useRefresh';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function Surah({navigation}: any) {
  const [surahs, setSurahs] = useState<ISurah[]>([]);
  const [search, setSearch] = useState<string>('');

  const getSurahs = async () => {
    try {
      const result = await axios.get('https://equran.id/api/v2/surat');
      setSurahs(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const {onRefresh, refreshing} = useOnRefresh(() => {
    getSurahs();
  });

  useEffect(() => {
    getSurahs();
  }, []);
  return (
    <View style={{padding: 20}}>
      <BackButton navigation={navigation} />
      <View
        style={{
          width: '100%',
          height: 50,
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 20,
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
        }}>
        <FontAwesome5Icon name="search" color={'gray'} size={15} />
        <TextInput
          placeholder="Cari disini..."
          placeholderTextColor={'gray'}
          style={{color: 'black', width: '100%'}}
          onChangeText={(e) => {
            if (e === '') {
              return getSurahs();
            }
            setSurahs(surahs.filter((s) => s.namaLatin.toLowerCase().includes(e.toLowerCase())))
          }}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{marginTop: 20, paddingBottom: 150}}>
        {surahs.map((surah: ISurah, index: number) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ListAyah', {surahId: surah.nomor});
            }}
            key={index}
            style={{
              marginVertical: 5,
              borderBottomWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text style={{fontSize: 20}}>
              {surah.nomor}. {surah.namaLatin} ({surah.tempatTurun}){' '}
              {surah.jumlahAyat} Ayat
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {ISurah} from '../../types/surah';
import axios from 'axios';
import {useOnRefresh} from '../../hooks/useRefresh';

export default function Surah({navigation}: any) {
  const [surahs, setSurahs] = useState<ISurah[]>([]);

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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 100}}>
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

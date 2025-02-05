import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {ISurah} from '../../types/surah';
import axios from 'axios';
import {useOnRefresh} from '../../hooks/useRefresh';
import {Ayat, IAyah} from '../../types/ayah';

export default function Ayah({navigation, route}: any) {
  const [ayahs, setAyahs] = useState<Ayat[] | null>(null);
  const [detailSurah, setDetailSurah] = useState<IAyah | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<number>(20);
  const [modal, setModal] = useState<boolean>(false);
  const getAyahs = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        'https://equran.id/api/v2/surat/' + route.params.surahId,
      );
      setAyahs(result.data.data?.ayat);
      setDetailSurah(result.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const {onRefresh, refreshing} = useOnRefresh(() => {
    getAyahs();
  });

  useEffect(() => {
    getAyahs();
  }, []);
  return (
    <View style={{padding: 20, paddingBottom: 100}}>
      <BackButton navigation={navigation} />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 24}}>{detailSurah?.namaLatin}</Text>
        <TouchableOpacity
          onPress={() => {
            setModal(true);
          }}
          style={{padding: 5, borderWidth: 1, borderRadius: 10, marginTop: 10}}>
          <Text style={{fontSize: 14, color: 'black'}}>
            Ukuran Huruf: {textSize}
          </Text>
        </TouchableOpacity>
      </View>
      {modal && (
        <Modal
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}
          animationType="slide"
          transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 20,
                width: 300,
              }}>
              <Text style={{fontSize: 20, textAlign: 'center', marginBottom:20}}>
                Pilih Ukuran Teks
              </Text>
              {[12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={{marginBottom: 10, borderBottomWidth: 1}}
                  onPress={() => {
                    setTextSize(size);
                    setModal(false);
                  }}>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{paddingBottom: 100}}>
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <>
            {ayahs?.map((ayah: Ayat, index: number) => (
              <View
                key={index}
                style={{
                  marginVertical: 5,
                  borderBottomWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                }}>
                <Text style={{fontSize: textSize, textAlign: 'right'}}>
                  {ayah?.teksArab} ({ayah?.nomorAyat})
                </Text>
                <Text
                  style={{
                    fontSize: textSize,
                    textAlign: 'left',
                    marginTop: 10,
                  }}>
                  Artinya:{'\n'}
                  {ayah?.teksIndonesia}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

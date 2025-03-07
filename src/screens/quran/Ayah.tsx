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
  const [textSize, setTextSize] = useState<any>({latin: 20, arabic: 20});
  const [modal, setModal] = useState<any>({open: false, data: {}});
  const [showMeaning, setShowMeaning] = useState<boolean>(true);
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
        <ScrollView horizontal style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setModal({open: true, data: 'mean'});
            }}
            style={{
              padding: 5,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 14, color: 'black'}}>
              {showMeaning ? 'Tampilkan Artinya' : 'Artinya Tidak Tampil'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModal({open: true, data: 'latin'});
            }}
            style={{
              padding: 5,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 5,
            }}>
            <Text style={{fontSize: 14, color: 'black'}}>
              Ukuran Teks Latin: {textSize?.latin}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModal({open: true, data: 'arabic'});
            }}
            style={{
              padding: 5,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              marginLeft: 5,
            }}>
            <Text style={{fontSize: 14, color: 'black'}}>
              Ukuran Teks Arab: {textSize.arabic}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {modal.open && (
        <Modal
          visible={modal.open}
          onRequestClose={() => {
            setModal({open: false});
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
            {modal.data == 'mean' ? (
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 20,
                  width: 300,
                }}>
                <Text
                  style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
                  Preferensi Tampilkan Arti
                </Text>
                {[
                  {value: true, label: 'Tampilkan Artinya'},
                  {value: false, label: 'Jangan Tampilkan Artinya'},
                ].map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{marginBottom: 10, borderWidth: 1, borderRadius: 5}}
                    onPress={() => {
                      setShowMeaning(value.value);
                      setModal(false);
                    }}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>
                      {value.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 20,
                  width: 300,
                }}>
                <Text
                  style={{fontSize: 20, textAlign: 'center', marginBottom: 20}}>
                  Pilih Ukuran Teks
                </Text>
                {[12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{marginBottom: 10, borderBottomWidth: 1}}
                    onPress={() => {
                      if (modal.data === 'latin') {
                        setTextSize({...textSize, latin: size});
                      } else {
                        setTextSize({...textSize, arabic: size});
                      }
                      setModal(false);
                    }}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </Modal>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 100,
          borderWidth: 2,
          borderRadius: 10,
          padding:5
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="green" />
        ) : (
          <View style={{borderWidth: 1, borderRadius: 10}}>
            {ayahs?.map((ayah: Ayat, index: number) => (
              <View
                key={index}
                style={{
                  marginVertical: 5,
                  // borderWidth: 1,
                  // borderRadius: 10,
                  padding: showMeaning ? 10 : 0,
                }}>
                <Text style={{fontSize: textSize?.arabic, textAlign: 'right'}}>
                  {ayah?.teksArab} ({ayah?.nomorAyat})
                </Text>
                {showMeaning && (
                  <Text
                    style={{
                      fontSize: textSize?.latin,
                      textAlign: 'left',
                    }}>
                    {index == 0 ? "Artinya:\n" : ""}
                    {ayah?.teksIndonesia}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

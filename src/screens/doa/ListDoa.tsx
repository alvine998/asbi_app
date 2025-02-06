import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import {IDonation} from '../../types/donation';
import {useOnRefresh} from '../../hooks/useRefresh';
import {IDoa} from '../../types/doa';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function ListDoa({navigation}: any) {
  const [doa, setDoa] = useState<IDoa[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<any>({latin: 20, arabic: 20});
  const [modal, setModal] = useState<any>({open: false, data: {}});
  const getDoa = async () => {
    setLoading(true);
    try {
      const result = await axios.get('https://open-api.my.id/api/doa');
      setDoa(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const {onRefresh, refreshing} = useOnRefresh(() => {
    getDoa();
  });

  useEffect(() => {
    getDoa();
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
        {/* <Text style={{fontSize: 24}}>{doa?.}</Text> */}
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => {
              setModal({open: true, data: 'latin'});
            }}
            style={{
              padding: 5,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
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
            }}>
            <Text style={{fontSize: 14, color: 'black'}}>
              Ukuran Teks Arab: {textSize.arabic}
            </Text>
          </TouchableOpacity>
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
            </View>
          </Modal>
        )}

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
            marginVertical: 20
          }}>
          <FontAwesome5Icon name="search" color={'gray'} size={15} />
          <TextInput
            placeholder="Cari disini..."
            placeholderTextColor={'gray'}
            style={{color: 'black', width: '100%'}}
            onChangeText={e => {
              if (e === '') {
                return getDoa();
              }
              if (doa) {
                setDoa(
                  doa.filter(s =>
                    s.judul.toLowerCase().includes(e.toLowerCase()),
                  ),
                );
              }
            }}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: 100}}>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              {doa?.map((item: IDoa, index: number) => (
                <View
                  key={index}
                  style={{
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: textSize?.latin,
                      textAlign: 'left',
                      marginTop: 10,
                    }}>
                    {item?.judul}
                  </Text>
                  <Text
                    style={{
                      fontSize: textSize?.arabic,
                      textAlign: 'right',
                      marginTop: 10,
                    }}>
                    {item?.arab}
                  </Text>
                  <Text
                    style={{
                      fontSize: textSize?.latin,
                      textAlign: 'left',
                      marginTop: 10,
                    }}>
                    Artinya:{'\n'}
                    {item?.terjemah}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

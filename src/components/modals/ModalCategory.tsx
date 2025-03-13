import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {formatThousand} from '../../lib/utils';
import axios from 'axios';
import {CONFIG} from '../../config';

interface Props {
  modal: any;
  setModal: any;
  onRefresh: any;
}

export default function ModalCategory({modal, setModal, onRefresh}: Props) {
  const [payload, setPayload] = useState<{id: number; name: string}>({
    name: modal.data?.name || '',
    id: modal.data?.id || '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: any, name: string) => {
    setPayload({
      ...payload,
      [name]: name == 'target' ? formatThousand(e) : e,
    });
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      if (modal.data?.id) {
        await axios.patch(
          CONFIG.BASE_URL_API + '/categories',
          {...payload, id: modal.data?.id},
          {
            headers: {
              'bearer-token': 'donasiquapi',
            },
          },
        );
      } else {
        await axios.post(CONFIG.BASE_URL_API + '/categories', payload, {
          headers: {
            'bearer-token': 'donasiquapi',
          },
        });
      }
      setLoading(false);
      setModal({open: false});
      Alert.alert('Berhasil Menyimpan Kategori');
      onRefresh();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
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
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>
            {modal.data?.id ? 'Ubah' : "Tambah"} Kategori
          </Text>
          <View style={{marginTop: 20}}>
            <Text style={{marginLeft: 10, color: '#808080'}}>
              Nama Kategori
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
                onChangeText={(e: any) => handleChange(e, 'name')}
                value={payload?.name}
                placeholder="Masukkan nama kategori"
                placeholderTextColor={'gray'}
                style={{color: 'black', width: '100%'}}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              width: '100%',
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 20,
              backgroundColor: '#4CAF50',
              justifyContent: 'center',
            }}>
            <Text style={{marginLeft: 10, color: 'white'}}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModal({open: false});
            }}
            style={{
              width: '100%',
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <Text style={{marginLeft: 10, color: 'black'}}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

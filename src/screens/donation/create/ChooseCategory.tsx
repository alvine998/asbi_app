import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../../../components/BackButton';
import {dummyCategories} from '../../../data/dummyCategory';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {CONFIG} from '../../../config';
import {ICategory} from '../../../types/category';
import ModalCategory from '../../../components/modals/ModalCategory';

export default function ChooseCategory({navigation}: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modal, setModal] = useState<any>({open: false, data: {}});

  const onRefresh = () => {
    setRefreshing(true);
    getCategories();
    setRefreshing(false);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        CONFIG.BASE_URL_API + '/categories?paginate=false',
        {
          headers: {
            'bearer-token': 'donasiquapi',
          },
        },
      );
      setCategories(result.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await axios.delete(
        CONFIG.BASE_URL_API + `/categories?id=${id}`,
        {
          headers: {
            'bearer-token': 'donasiquapi',
          },
        },
      );
      Alert.alert('Berhasil Menghapus Kategori');
      setLoading(false);
      onRefresh();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const showOptions = (data: ICategory) => {
    Alert.alert('Aksi', 'Pilih aksi yang ingin dilakukan', [
      {text: 'Ubah', onPress: () => setModal({open: true, data: data})},
      {text: 'Hapus', onPress: () => onDelete(data.id)},
      {text: 'Batal', style: 'cancel'},
    ]);
  };

  return (
    <View style={{padding: 20, paddingBottom: 100}}>
      <BackButton navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}>
          Pilih Kategori Donasi
        </Text>

        {!loading ? (
          <View>
            {categories?.length > 0 ? (
              <View>
                {categories?.map((item: any, index: number) => (
                  <TouchableOpacity
                    onLongPress={() => {
                      showOptions(item);
                    }}
                    key={index}
                    onPress={() =>
                      navigation.navigate('CreateDonation', {
                        category: item,
                      })
                    }
                    style={{
                      margin: 5,
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                      backgroundColor: 'white',
                      elevation: 3,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {item.name}
                    </Text>
                    <FontAwesome5Icon name="chevron-right" color={'black'} />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={{alignItems: 'center', marginTop: 100}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    marginTop: 20,
                  }}>
                  Tidak ada kategori
                </Text>
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color="green"
            style={{marginTop: 200}}
          />
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          setModal({open: true, data: {}});
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'green',
          padding: 15,
          borderRadius: 50,
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FontAwesome5Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
      {modal.open && (
        <ModalCategory
          modal={modal}
          setModal={setModal}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

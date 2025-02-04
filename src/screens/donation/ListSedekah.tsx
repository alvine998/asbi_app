import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {datas} from '../../data/dummyDonation';
import DonationCard from '../../components/DonationCard';

export default function ListSedekah({navigation, route}: any) {
  const [select, setSelect] = useState<any>('Semua');
  const filterTabs = [
    {
      name: 'Semua',
    },
    {
      name: 'Pilih Kategori',
    },
    {
      name: 'Terdesak',
    },
    {
      name: 'Terbaru',
    },
    {
      name: 'Oleh Yayasan',
    },
    {
      name: 'Oleh Perorangan',
    },
  ];
  return (
    <View style={{padding: 20, paddingBottom: 70}}>
      <BackButton navigation={navigation} />
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            paddingLeft: 20,
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <FontAwesome5Icon name="search" color={'gray'} size={15} />
          <TextInput
            placeholder="Cari disini..."
            placeholderTextColor={'gray'}
            style={{color: 'black', width: '100%'}}
          />
        </View>

        {/* Filter */}
        <ScrollView horizontal>
          <View style={{marginTop: 10, flexDirection: 'row', gap: 5}}>
            {filterTabs?.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelect(item.name);
                }}
                style={{
                  margin: 5,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: select === item.name ? 'green' : 'white',
                  elevation: 3,
                  width: 'auto',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: select === item.name ? 'white' : 'black',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View>
          {datas?.map((item, index) => (
            <DonationCard key={index} data={item} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

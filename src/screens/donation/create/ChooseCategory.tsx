import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import BackButton from '../../../components/BackButton';
import {dummyCategories} from '../../../data/dummyCategory';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function ChooseCategory({navigation}: any) {
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
          Pilih Kategori Donasi
        </Text>

        <View>
          {dummyCategories?.map((item: any, index: number) => (
            <TouchableOpacity
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
      </ScrollView>
    </View>
  );
}

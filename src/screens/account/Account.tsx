import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useOnRefresh} from '../../hooks/useRefresh';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

export default function Account() {
  const {onRefresh, refreshing} = useOnRefresh(() => {
    console.log('refreshing');
  });

  const tabs = [
    {
      name: 'Ketentuan Pengguna',
      href: 'terms',
    },
    {
      name: 'Kebijakan Privasi',
      href: 'privacy',
    },
    {
      name: 'Pusat Bantuan',
      href: 'help',
    },
    {
      name: 'Keluar',
      href: 'logout',
    },
  ];
  return (
    <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={{
            margin: 20,
            padding: 20,
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            gap: 30,
            // alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: '#808080',
            }}></View>
          <View>
            <Text style={{fontSize: 20}}>Johan Andreas</Text>
            <Text style={{fontSize: 14}}>johanandreas@gmail.com</Text>
            <Text style={{fontSize: 20, marginTop: 20}}>Poin: 20</Text>
          </View>
        </TouchableOpacity>

        <View>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginHorizontal: 10,
                // marginVertical: 10,
                marginTop: tab.href === 'logout' ? 20 : 0,
                padding: 10,
                borderBottomWidth: 1,
                borderRadius: 10,
                backgroundColor: tab.href === 'logout' ? 'red' : 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: tab.href === 'logout' ? 'white' : 'black',
                }}>
                {tab.name}
              </Text>
              <IconFA5
                name="chevron-right"
                size={15}
                color={tab.href === 'logout' ? 'white' : 'black'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 20}}>
          Versi 0.1.1
        </Text>
      </ScrollView>
    </View>
  );
}

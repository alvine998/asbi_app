import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import {useOnRefresh} from '../../hooks/useRefresh';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

export default function Account({navigation}: any) {
  const {onRefresh, refreshing} = useOnRefresh(() => {
    console.log('refreshing');
  });

  const tabs = [
    {
      name: 'Poin',
      href: 'point',
    },
    {
      name: 'Profil Penggalang Dana',
      href: 'profile',
    },
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
      href: 'Login',
    },
  ];
  return (
    <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          gap: 30,
          backgroundColor: 'green',
          zIndex: 1,
          // alignItems: 'center',
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            backgroundColor: '#dfdfdf',
          }}></View>
        <View>
          <Text style={{color: 'white', fontSize: 20}}>Johan Andreas</Text>
          <Text style={{color: 'white', fontSize: 14}}>
            johanandreas@gmail.com
          </Text>
          <View style={{marginTop: 20}}>
            <Button
              title="Edit Profil"
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(tab.href);
              }}
              style={{
                marginHorizontal: 10,
                // marginVertical: 10,
                marginTop: tab.href === 'Login' ? 20 : 0,
                padding: 10,
                borderBottomWidth: 1,
                borderRadius: 10,
                backgroundColor: tab.href === 'Login' ? 'red' : 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: tab.href === 'Login' ? 'white' : 'black',
                }}>
                {tab.name}
              </Text>
              {tab.href === 'point' ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                  }}>
                  100
                </Text>
              ) : (
                <IconFA5
                  name="chevron-right"
                  size={15}
                  color={tab.href === 'logout' ? 'white' : 'black'}
                />
              )}
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

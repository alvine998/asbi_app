import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  navigation: any;
}

export default function BackButton({navigation}: Props) {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 20
      }}>
      <FontAwesome5Icon name="chevron-left" size={20} />
      <Text style={{color: 'black', fontSize: 20}}>Kembali</Text>
    </TouchableOpacity>
  );
}

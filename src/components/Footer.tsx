import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function Footer() {
  return (
    <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}>
        <TouchableOpacity>
          <Text style={{color: '#808080', fontSize: 12}}>Tentang DonasiQu</Text>
        </TouchableOpacity>
        <Text style={{color: '#808080', fontSize: 12}}>|</Text>
        <TouchableOpacity>
          <Text style={{color: '#808080', fontSize: 12}}>
            Syarat & Ketentuan
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#808080', fontSize: 12}}>|</Text>
        <TouchableOpacity>
          <Text style={{color: '#808080', fontSize: 12}}>Pusat Bantuan</Text>
        </TouchableOpacity>
      </View>

      {/* Sosmed */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://facebook.com');
          }}>
          <FontAwesome5Icon name="facebook" size={40} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://x.com');
          }}>
          <FontAwesome5Icon name="twitter" size={40} color="#1DA1F2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://instagram.com');
          }}>
          <FontAwesome5Icon name="instagram" size={40} color="violet" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://youtube.com');
          }}>
          <FontAwesome5Icon name="youtube" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://donasiqu.com');
          }}>
          <FontAwesome5Icon name="link" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Copyright */}
      <Text
        style={{
          fontSize: 12,
          color: '#808080',
          marginTop: 10,
          textAlign: 'center',
        }}>
        Copyright © {new Date().getFullYear()} DonasiQu. All Rights Reserved
      </Text>
    </View>
  );
}

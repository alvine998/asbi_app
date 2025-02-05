import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ProgressBar} from './ProgressBar';

interface Props {
  navigation: any;
  data: any;
}

export default function DonationCard({data, navigation}: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailDonation', {
            id: data.id,
            thumbnail: data.thumbnail,
            title: data.title,
            target: data.target,
            raised: data.raised,
          });
        }}
        style={{
          margin: 10,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          backgroundColor: 'white',
          elevation: 3,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: String(data.thumbnail)}}
            style={{width: 150, height: 150, resizeMode: 'cover'}}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {data.title}
        </Text>
        <ProgressBar reach={data.raised} target={data.target} />
      </TouchableOpacity>
    </View>
  );
}

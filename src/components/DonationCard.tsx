import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ProgressBar} from './ProgressBar';

interface Props {
  navigation: any;
  data: any;
  size?: 'small' | 'large';
}

export default function DonationCard({
  data,
  navigation,
  size = 'large',
}: Props) {
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
          margin: 5,
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: size == 'large' ? 10 : 5,
          paddingVertical: 10,
          backgroundColor: 'white',
          elevation: 3,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: String(data.thumbnail)}}
            style={{
              width: size == 'large' ? 250 : 120,
              height: size == 'large' ? 250 : 120,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: size == "small" ? 12 : 16,
            fontWeight: 'bold',
            textAlign: 'left',
            marginTop: 10,
          }}>
          {data.title}
        </Text>
        <ProgressBar reach={data.raised} target={data.target} size={size} />
      </TouchableOpacity>
    </View>
  );
}

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  data: any;
}

export default function WishCard({data}: Props) {
  return (
    <View>
      <TouchableOpacity
        style={{
          margin: 5,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          backgroundColor: 'white',
          elevation: 3,
          height: 100,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          "{data.title}"
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'left',
          }}>
          - {data.from}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

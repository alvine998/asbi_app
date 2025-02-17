import {View, Text, ScrollView, FlatList, Animated} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../../components/BackButton';

const transactions = [
  {
    id: '0',
    date: '',
    type: 'Total Saldo',
    amount: 'Rp 1.000.000,-',
    // balance: 'Rp 1.000.000,-',
  },
  {
    id: '1',
    date: '17/02/2025 17:50',
    type: 'Penarikan Saldo',
    amount: 'Rp 2.000.000,-',
    balance: 'Rp 1.000.000,-',
  },
  {
    id: '2',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '3',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '4',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '5',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '6',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '7',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '8',
    date: '16/02/2025 15:30',
    type: 'Top Up',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
];

export default function Balance({navigation}: any) {
  const [fontSize, setFontSize] = useState(new Animated.Value(34));
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newSize = Math.max(24, 34 - scrollY / 10); // Min size: 24, Max size: 34
    setFontSize(new Animated.Value(newSize));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 20}}>
        <BackButton navigation={navigation} />
      </View>
      <Animated.Text
        style={{
          fontSize: fontSize,
          color: 'black',
          textAlign: 'center',
        }}>
        SALDO ANDA
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: fontSize,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          marginTop: 10,
        }}>
        Rp 1.000.000,-
      </Animated.Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: 'green',
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
          padding: 20,
          elevation: 3,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
          }}>
          Riwayat Saldo
        </Text>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{borderTopWidth: 1, borderColor: 'white', marginTop: 10}}>
              {item.date && (
                <Text style={{fontSize: 16, color: 'white', marginTop: 10}}>
                  {item.date}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: item.date ? 0 : 10,
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>{item.type}</Text>
                <Text style={{fontSize: 16, color: 'white'}}>
                  {item.amount}
                </Text>
              </View>
              {item.balance && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>Sisa</Text>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    {item.balance}
                  </Text>
                </View>
              )}
            </View>
          )}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Ensures smooth scrolling updates
        />
      </View>
    </View>
  );
}

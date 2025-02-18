import {
  View,
  Text,
  ScrollView,
  FlatList,
  Animated,
  Button,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import DialogModal from '../../components/DIalogModal';
import {formatThousand} from '../../lib/utils';
import PinInput from '../../components/PinInput';
import {useAmountStore} from '../../store/useAmountStore';

const transactions = [
  {
    id: '0',
    date: '',
    type: 'Total Dompet',
    amount: 'Rp 5.000.000,-',
    // balance: 'Rp 1.000.000,-',
  },
  {
    id: '1',
    date: '17/02/2025 17:50',
    type: 'Top Up Saldo',
    amount: 'Rp 2.000.000,-',
    balance: 'Rp 1.000.000,-',
  },
  {
    id: '2',
    date: '16/02/2025 15:30',
    type: 'Top Up Saldo',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '3',
    date: '16/02/2025 15:30',
    type: 'Tarik Tunai',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '4',
    date: '16/02/2025 15:30',
    type: 'Tarik Tunai',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '5',
    date: '16/02/2025 15:30',
    type: 'Tarik Tunai',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '6',
    date: '16/02/2025 15:30',
    type: 'Tarik Tunai',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '7',
    date: '16/02/2025 15:30',
    type: 'Top Up Saldo',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
  {
    id: '8',
    date: '16/02/2025 15:30',
    type: 'Top Up Saldo',
    amount: 'Rp 1.500.000,-',
    balance: 'Rp 3.500.000,-',
  },
];

export default function Wallet({navigation, route}: any) {
  const [fontSize, setFontSize] = useState(new Animated.Value(34));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalPin, setModalPin] = useState<boolean>(false);
  const [totalWallet, setTotalWallet] = useState<number>(0);
  const [pin, setPin] = useState<string>('');
  const {amount, setAmount, wallet, setWallet, balance, setBalance} =
    useAmountStore();

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newSize = Math.max(24, 34 - scrollY / 10); // Min size: 24, Max size: 34
    setFontSize(new Animated.Value(newSize));
  };

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEnterPin = (pins: string) => {
    if (pins !== '555555') {
      return setErrorMessage('Pin yang anda masukkan salah');
    }
    navigation.navigate('Balance', {topup: amount});
    setWallet(wallet - amount);
    setBalance(balance + amount);
    setModalPin(false);
    Alert.alert('Berhasil Top Up');
  };

  useEffect(() => {
    setTotalWallet(wallet);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulating a data fetch with a timeout
    setTimeout(() => {
      setTotalWallet(wallet);
      setRefreshing(false);
    }, 2000); // Simulated network request delay
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
        DOMPET ANDA
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: fontSize,
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          marginTop: 10,
        }}>
        Rp {formatThousand(wallet?.toString())},-
      </Animated.Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
          width: '100%',
        }}>
        <Button title="Tarik Tunai" color={'green'} onPress={() => {}} />
        <Button title="Top Up Saldo" onPress={() => setModalVisible(true)} />
      </View>
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
          Riwayat Dompet
        </Text>

        <FlatList
          data={transactions}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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

      {/* Modal Top Up */}
      <DialogModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Top Up Saldo">
        <TextInput
          placeholder="0"
          keyboardType="numeric"
          style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 300,
            fontSize: 30,
          }}
          value={formatThousand(amount?.toString())}
          onChangeText={e => setAmount(+e.replaceAll(',', ''))}
          placeholderTextColor={'gray'}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAmount(50000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>50.000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(100000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>100.000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(150000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>150.000</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAmount(200000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>200.000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(500000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>500.000</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAmount(1000000);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>1.000.000</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20, flexDirection: 'column', gap: 10}}>
          <Button
            title="Top Up Sekarang"
            color={'green'}
            onPress={() => {
              setModalVisible(false);
              setModalPin(true);
            }}
          />
          <Button
            title="Batalkan"
            color={'red'}
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </DialogModal>

      {/* Modal Pin */}
      <DialogModal
        visible={modalPin}
        onClose={() => setModalPin(false)}
        title="Masukkan Pin Dompetmu">
        <PinInput
          onChange={setPin}
          onLastDigitChange={(pins: string) => {
            handleEnterPin(pins);
          }}
        />
        {errorMessage && (
          <Text style={{color: 'red', fontSize: 12}}>{errorMessage}</Text>
        )}
        <View style={{marginTop: 20, flexDirection: 'column', gap: 10}}>
          <Button
            title="Batalkan"
            color={'red'}
            onPress={() => {
              setModalPin(false);
              setModalVisible(true);
            }}
          />
        </View>
      </DialogModal>
    </View>
  );
}

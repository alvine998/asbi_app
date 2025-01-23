import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {useOnRefresh} from '../hooks/useRefresh';
import {ProgressBar} from '../components/ProgressBar';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function Home({navigation, route}: any) {
  const {width, height} = Dimensions.get('window'); // or 'screen'

  const {onRefresh, refreshing} = useOnRefresh(() => {
    console.log('refreshing');
  });

  const datas = [
    {
      id: 1,
      title: 'Donasi 1',
      target: 5000,
      raised: 1000,
      thumbnail: require('../assets/images/logo.jpeg'),
    },
    {
      id: 2,
      title: 'Donasi 2',
      target: 3000,
      raised: 1000,
      thumbnail: require('../assets/images/logo.jpeg'),
    },
    {
      id: 3,
      title: 'Donasi 3',
      target: 10000,
      raised: 1000,
      thumbnail: require('../assets/images/logo.jpeg'),
    },
  ];

  const wishes = [
    {
      id: 1,
      title: 'Jadilah yang terbaik untuk nusa bangsa',
      from: 'John Doe',
    },
    {
      id: 2,
      title: 'Semoga lekas sembuh palestina',
      from: 'John Lenon',
    },
    {
      id: 3,
      title: 'Sukses selalu di masa depan',
      from: 'Iker Doe',
    },
  ];

  useEffect(() => {
    // Create a handler to block the back button
    const onBackPress = () => {
      if (route.name === 'Home') {
        Alert.alert(
          'Keluar',
          'Apakah kamu yakin ingin keluar?',
          [
            {text: 'Batalkan', style: 'cancel'},
            {text: 'Ya', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true; // Return true to prevent the default back action
      }
    };

    // Add back handler listener
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    // Clean up the listener when component unmounts
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Search Bar */}
        <View
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            paddingLeft: 20,
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              width: width * 0.65,
              height: height * 0.05,
              borderWidth: 1,
              borderRadius: 20,
              paddingLeft: 20,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <FontAwesome5Icon name="search" color={'gray'} size={15} />
            <TextInput
              placeholder="Cari disini..."
              placeholderTextColor={'gray'}
              style={{color: 'black', width: width * 0.5}}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)
            }
            style={{
              width: width * 0.1,
              height: height * 0.05,
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5Icon name="envelope" size={20} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)
            }
            style={{
              width: width * 0.1,
              height: height * 0.05,
              borderWidth: 1,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5Icon name="user-circle" size={20} color={'black'} />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 3,
            margin: 10,
            marginTop: 20,
          }}>
          <View
            style={{
              backgroundColor: '#dbebd0',
              height: 150,
              width: 150,
              position: 'absolute',
              top: 0,
              right: 0,
              borderBottomLeftRadius: 50,
            }}></View>
          <View
            style={{
              backgroundColor: '#dbebd0',
              height: 150,
              width: 150,
              position: 'absolute',
              bottom: 0,
              left: 0,
              borderTopRightRadius: 50,
            }}></View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
              color: 'black',
            }}>
            Selamat Datang di Donasiqu
          </Text>
          <Image
            source={require('../assets/images/donate.png')}
            style={{width: 300, height: 300}}
          />
        </View>

        {/* Donasi Terkini */}
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              marginTop: 20,
              color: 'black',
            }}>
            Donasi Terkini
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <TouchableOpacity
                key={index}
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
                <Image
                  source={data.thumbnail}
                  style={{width: 250, height: 150}}
                />
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
            ))}
            <TouchableOpacity
              style={{
                margin: 10,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                backgroundColor: 'white',
                elevation: 3,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Lihat Selengkapnya
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Wakaf & Zakat */}
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              marginTop: 20,
              color: 'black',
            }}>
            Wakaf & Zakat
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white',
                  elevation: 3,
                }}>
                <Image
                  source={data.thumbnail}
                  style={{width: 250, height: 150}}
                />
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
            ))}
          </ScrollView>
        </View>

        {/* Rekomendasi Untukmu */}
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              marginTop: 20,
              color: 'black',
            }}>
            Rekomendasi Untukmu
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white',
                  elevation: 3,
                }}>
                <Image
                  source={data.thumbnail}
                  style={{width: 250, height: 150}}
                />
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
            ))}
          </ScrollView>
        </View>

        {/* Harapan Kami */}
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              marginTop: 20,
              color: 'black',
            }}>
            Harapan Kami
          </Text>
          <ScrollView horizontal>
            {wishes?.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  margin: 10,
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
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

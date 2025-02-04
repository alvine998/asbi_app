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
import DonationCard from '../components/DonationCard';
import WishCard from '../components/WishCard';
import BannerSlide from '../components/BannerSlide';
import {banners} from '../data/dummyBanner';

export default function Home({navigation, route}: any) {
  const {width, height} = Dimensions.get('window'); // or 'screen'

  const {onRefresh, refreshing} = useOnRefresh(() => {
    // console.log('refreshing');
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

  // useEffect(() => {
  //   // Create a handler to block the back button
  //   const onBackPress = () => {
  //     if (route.name === 'Home') {
  //       Alert.alert(
  //         'Keluar',
  //         'Apakah kamu yakin ingin keluar?',
  //         [
  //           {text: 'Batalkan', style: 'cancel'},
  //           {text: 'Ya', onPress: () => BackHandler.exitApp()},
  //         ],
  //         {cancelable: false},
  //       );
  //       return true; // Return true to prevent the default back action
  //     }
  //     return false
  //   };

  //   // Add back handler listener
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     onBackPress,
  //   );

  //   // Clean up the listener when component unmounts
  //   return () => backHandler.remove();
  // }, [route.name]);
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
            <FontAwesome5Icon name="bell" size={20} color={'black'} />
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

        {/* Menu */}
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 40,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ListDonation')}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon name="donate" size={40} color={'green'} />
              <Text>Donasi</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ListInfaq')}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon
                name="praying-hands"
                size={40}
                color={'green'}
              />
              <Text>Infaq</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ListSedekah')}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon
                name="hand-holding-heart"
                size={40}
                color={'green'}
              />
              <Text>Sedekah</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ListZakat')}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon name="handshake" size={40} color={'green'} />
              <Text>Zakat</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 40,
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon name="quran" size={40} color={'green'} />
              <Text>Qur'an</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon name="pray" size={40} color={'green'} />
              <Text>Do'a</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome5Icon name="child" size={40} color={'green'} />
              <Text>Harapan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5Icon name="mosque" size={40} color={'green'} />
              <Text>Waktu Shalat</Text>
            </TouchableOpacity>
          </View>
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
              <DonationCard data={data} key={index} navigation={navigation} />
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListDonation');
              }}
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

        {/* Banner */}
        {/* <View style={{padding: 20}}>
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
          <BannerSlide data={banners} />
        </View> */}

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
              <DonationCard data={data} key={index} navigation={navigation} />
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListZakat');
              }}
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
              <DonationCard data={data} key={index} navigation={navigation} />
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ListDonation');
              }}
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
              <WishCard data={data} key={index} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

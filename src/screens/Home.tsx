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
  Linking,
} from 'react-native';
import React, {useEffect} from 'react';
import {useOnRefresh} from '../hooks/useRefresh';
import {ProgressBar} from '../components/ProgressBar';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DonationCard from '../components/DonationCard';
import WishCard from '../components/WishCard';
import BannerSlide from '../components/BannerSlide';
import {banners} from '../data/dummyBanner';
import Footer from '../components/Footer';
import {datas} from '../data/dummyDonation';
import {ListProvince} from '../data/province';
import {formatThousand, multiReplace} from '../lib/utils';
import {useAmountStore} from '../store/useAmountStore';
import useUserStore from '../store/useUserStore';
import {Banners2} from '../data/dummyBanner2';
import { dummyFoundation } from '../data/dummyFoundation';

export default function Home({navigation, route}: any) {
  const {width, height} = Dimensions.get('window'); // or 'screen'
  const {balance, wallet, setBalance, setWallet} = useAmountStore();
  const {user} = useUserStore();

  const {onRefresh, refreshing} = useOnRefresh(() => {
    // console.log('refreshing');
    setWallet(wallet);
    setBalance(balance);
  });

  const replacements = {
    Kepulauan: 'Kep',
    Sumatera: 'Sum',
    Sulawesi: 'Sul',
    Kalimantan: 'Kal',
    'Nusa Tenggara Timur': 'NTT',
    'Nusa Tenggara Barat': 'NTB',
    Papua: 'Pap',
  };

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
    setWallet(user?.wallet || 0);
    setBalance(user?.balance || 0);
  }, []);

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
            marginTop: 10,
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
              zIndex: -1,
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
              zIndex: -1,
            }}></View>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dzrthkexn/image/upload/v1738692091/donasiqu/fvmjvx6hmh4p33xdyyvj.png',
            }}
            width={400}
            height={300}
            style={{width: 350, height: 250, marginTop: -70, zIndex: 5}}
          />
          <View style={{position: 'absolute', bottom: 40, left: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Hai, {user?.name}
            </Text>
            <Text style={{fontSize: 12, color: 'gray', marginTop: 0}}>
              Selamat datang di DonasiQu
            </Text>
          </View>

          <View style={{position: 'absolute', bottom: 40, right: 30}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {user?.donation || 0}x
            </Text>
            <Text style={{fontSize: 12, color: 'gray', marginTop: 0}}>
              Donasimu
            </Text>
          </View>
        </View>

        {/* Balance */}
        <View style={{paddingHorizontal: 20, marginTop: -45}}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 3,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '100%',
              padding: 10,
              borderRadius: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Balance');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 130,
              }}>
              <FontAwesome5Icon name="money-check" size={18} color={'green'} />
              <View>
                <Text>Saldo</Text>
                <Text style={{fontWeight: '800'}}>
                  Rp {formatThousand(balance?.toString())}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{height: '100%', borderRightWidth: 1}}></View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Wallet');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 130,
              }}>
              <FontAwesome5Icon name="wallet" size={20} color={'green'} />
              <View>
                <Text>Dompet</Text>
                <Text style={{fontWeight: '800'}}>
                  Rp {formatThousand(wallet?.toString())}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu */}
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListDonation')}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="donate" size={20} color={'green'} />
                <Text>Donasi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListSurah')}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="quran" size={20} color={'green'} />
                <Text>Qur'an</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
                marginLeft: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListInfaq')}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon
                  name="praying-hands"
                  size={20}
                  color={'green'}
                />
                <Text>Infaq</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ListDoa')}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="pray" size={20} color={'green'} />
                <Text>Do'a</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
                marginLeft: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ListSedekah')}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon
                  name="hand-holding-heart"
                  size={20}
                  color={'green'}
                />
                <Text>Sedekah</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="child" size={20} color={'green'} />
                <Text>Harapan</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)
                }
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="handshake" size={20} color={'green'} />
                <Text>Zakat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrayTime')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome5Icon name="mosque" size={20} color={'green'} />
                <Text>Wkt Shalat</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)
                }
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5Icon name="cube" size={20} color={'green'} />
                <Text>Umroh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome5Icon name="bars" size={20} color={'green'} />
                <Text>Lainnya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Banner */}
        <View style={{paddingVertical: 10}}>
          <BannerSlide data={banners} />
        </View>

        {/* Donasi Terkini */}
        <View style={{paddingHorizontal: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'black',
            }}>
            Donasi Terkini
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <DonationCard
                data={data}
                key={index}
                navigation={navigation}
                size="small"
              />
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
                  fontSize: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Lihat Selengkapnya
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Rekomendasi Untukmu */}
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'black',
            }}>
            Rekomendasi Untukmu
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <DonationCard
                data={data}
                key={index}
                navigation={navigation}
                size="small"
              />
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
                  fontSize: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Lihat Selengkapnya
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* List Yayasan */}
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'black',
            }}>
            Cari Yayasan
          </Text>
          <ScrollView horizontal>
            {dummyFoundation?.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  borderWidth: 1,
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image
                  source={{uri: String(data)}}
                  style={{width: 70, height: 70, borderRadius: 10}}
                  width={70}
                  height={70}
                />
                </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Infaq & Sedekah */}
        <View style={{paddingHorizontal: 10, paddingTop: 0}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'black',
            }}>
            Infaq & Sedekah
          </Text>
          <ScrollView horizontal>
            {datas?.map((data, index) => (
              <DonationCard
                data={data}
                key={index}
                navigation={navigation}
                size="small"
              />
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
                  fontSize: 12,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Lihat Selengkapnya
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Daerah Pilihan Provinsi */}
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: 'black',
            }}>
            Daerah Pilihan
          </Text>
          <ScrollView horizontal>
            {ListProvince?.map((data, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  {data.image ? <Image source={{uri: data.image}} style={{objectFit: 'cover', width:80, height:80, borderRadius:80}} /> : <></>}
                </View>
                <Text>{multiReplace(data?.name, replacements)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Banner 2 */}
        <View style={{paddingVertical: 10}}>
          <BannerSlide data={Banners2} />
        </View>

        {/* Harapan Kami */}
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
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

        {/* Footer */}
        <Footer />
      </ScrollView>
    </View>
  );
}

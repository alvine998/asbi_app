import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import GetLocation from 'react-native-get-location';
import {useLocationStore} from '../../store/locationStore';
import axios from 'axios';
import moment from 'moment';
import {useOnRefresh} from '../../hooks/useRefresh';

export default function PrayTime({navigation}: any) {
  const {address} = useLocationStore();
  let location = address?.split(', ');
  const [schedules, setSchedules] = useState<any>([]);

  const getPrayTime = async () => {
    try {
      const city = await axios.get(
        `https://api.myquran.com/v2/sholat/kota/cari/${
          location[1]?.includes('KOTA') || location[1]?.includes('KAB.')
            ? location[1]
            : location[2]
        }`,
      );
      const result = await axios.get(
        `https://api.myquran.com/v2/sholat/jadwal/${
          city.data?.data[0]?.id
        }/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
      );
      setSchedules(result.data.data?.jadwal);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrayTime();
  }, []);

  const {onRefresh, refreshing} = useOnRefresh(() => {
    getPrayTime();
  });
  return (
    <View style={{padding: 20, paddingBottom: 100}}>
      <BackButton navigation={navigation} />
      <Text style={{fontSize: 24, textAlign: 'center'}}>
        Waktu Shalat {moment().format('MMM')} {moment().format('YYYY')}
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {address == null ? (
          <ActivityIndicator
            size="large"
            color="green"
            style={{marginTop: 20}}
          />
        ) : (
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 10,
                fontWeight: 'bold',
                paddingLeft: 10
              }}>
              {location[0]}, {location[1]}
            </Text>
            <ScrollView
              horizontal
              contentContainerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 20,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Tanggal
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.tanggal?.split(', ')[1]}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Subuh
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.subuh}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Terbit
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.terbit}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Zuhur
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.dzuhur}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Ashar
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.ashar}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Maghrib
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.maghrib}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
                  Isya
                </Text>
                {schedules?.length > 0 ? (
                  schedules.map((item: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            item.tanggal?.split(', ')[1] !==
                            moment().format('DD/MM/YYYY')
                              ? 'black'
                              : 'green',
                          fontWeight: 'bold',
                        }}>
                        {item.isya}
                      </Text>
                    </View>
                  ))
                ) : (
                  <></>
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

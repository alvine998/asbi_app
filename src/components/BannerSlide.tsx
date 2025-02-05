import {View, Text, Dimensions, ScrollView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {IBanner} from '../types/banner';

interface Props {
  data: IBanner[];
}

const {width} = Dimensions.get('window'); // Get screen width

export default function BannerSlide({data}: Props) {
  const scrollViewRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current?.scrollTo({x: nextIndex * width, animated: true});
        return nextIndex;
      });
    }, 3000); // Change page every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16} // Improves performance
    >
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            width: width,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: index % 2 === 0 ? 'white' : 'white',
          }}>
          <Image source={{uri: String(item.url)}} style={{width: '92%', height: '70%', objectFit: 'fill'}} />
        </View>
      ))}
    </ScrollView>
  );
}

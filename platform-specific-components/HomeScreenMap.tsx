import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Thumbnail } from 'native-base'

import MapView from 'react-native-maps'

export default function HomeScreen() {
  const [imageURL, setImageURL] = useState('https://cdn.discordapp.com/attachments/664605666815639552/751561243978104903/iu.png')

  return (
    <Thumbnail source={{ uri: imageURL }} style={styles.middleImage} />
  )
}
const styles = StyleSheet.create({
  middleImage: {
    width: (Dimensions.get('screen').width / 1.1),
    height: (Dimensions.get('screen').height / 2.5),
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    resizeMode: 'contain',
    borderLeftWidth: 20,
    borderLeftColor: 'white'
  },
});

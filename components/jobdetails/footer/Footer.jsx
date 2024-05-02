import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url, favourites, setFavourites, jobData }) => {
  console.log("current favourites:", favourites);
  console.log("current jobData", jobData);
  const [favourited, setFavourited] = useState(favourites.filter((job) => job.job_id === jobData.job_id).length > 0);

  const handleFavourite = () => {
    if (favourited){
      setFavourites(favourites.filter((job) => job.job_id !== jobData.job_id))
    } else {
      setFavourites(oldArr => [...oldArr, jobData])
    }
    setFavourited(old => !old);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={handleFavourite}>
        <Image 
          source={favourited ? icons.heart : icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply For Job</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer
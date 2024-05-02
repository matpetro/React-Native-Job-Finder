import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import styles from './newjobs.style'
import { SIZES } from '../../../constants'
import NewJobCard from '../../common/cards/new/NewJobCard'

const Newjobs = ({ data }) => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> New Jobs </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data = {data}
          renderItem={({ item }) => (
            <NewJobCard 
              item={item}
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={item => item.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium}}
          horizontal
        />
      </View>
    </View>
  )
}

export default Newjobs
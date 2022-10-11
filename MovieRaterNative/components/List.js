import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function List() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': `Token be7620259c170ae45df8924770acdab9be02ac3d`
      }
    })
    .then(res => res.json())
    .then(jsonRes => setMovies(jsonRes))
    .catch(err => console.error(err))
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <Text key={item.id}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

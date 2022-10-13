import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function List(props) {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('http://172.25.91.175:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': `Token be7620259c170ae45df8924770acdab9be02ac3d`
      }
    })
    .then(res => res.json())
    .then(jsonRes => setMovies(jsonRes))
    .catch(err => console.error(err))
  }, [])

  const movieclicked = (movie) => {
    props.navigation.navigate("Detail", {movie: movie, title: movie.title})
  }

  return (
    <View>
      <Image source={require('../assets/MR-logo.png')} 
        style={{width: '100%', height: 135, paddingTop: 30}} 
        resizeMode='contain' 
      />
      <FlatList
        data={movies}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => movieclicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: '#282C35',
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
  }
});

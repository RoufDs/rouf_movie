import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Detail(props) {

    const movie = props.navigation.getParam('movie', null)
    const [hightlight, setHightlight] = useState(0)

    const rateclicked = () => {
        if(hightlight > 0 && hightlight < 6) {
            fetch(`http://192.168.1.118:8000/api/movies/${movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token be7620259c170ae45df8924770acdab9be02ac3d`
            },
            body: JSON.stringify({stars: hightlight})
        })
        .then(res => res.json())
        .then(res => {
            setHightlight(0)
            Alert.alert("Rating", res.message)
        })
        .catch(err => Alert.alert("Error", err)) 
        }
    }

    return (
        <View style={styles.container}>    
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={movie.avg_rating > 0 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 1 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 2 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 3 ? styles.orange : styles.white} icon={faStar} />
                <FontAwesomeIcon style={movie.avg_rating > 4 ? styles.orange : styles.white} icon={faStar} />
                <Text style={styles.white}>({movie.no_of_ratings})</Text>
            </View>
            <Text style={styles.description}>{movie.description}</Text>

            <View style={{borderBottomColor: 'white', borderBottomWidth: 2}} />
            <Text style={styles.description}>Rate it !!!</Text>
            <View style={styles.starContainer}>
                <FontAwesomeIcon style={hightlight > 0 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={() => setHightlight(1)} />
                <FontAwesomeIcon style={hightlight > 1 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={() => setHightlight(2)} />
                <FontAwesomeIcon style={hightlight > 2 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={() => setHightlight(3)} />
                <FontAwesomeIcon style={hightlight > 3 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={() => setHightlight(4)} />
                <FontAwesomeIcon style={hightlight > 4 ? styles.purple : styles.grey} icon={faStar} size={48} onPress={() => setHightlight(5)} />            
            </View>
            <Button title='Rate' onPress={() => rateclicked()} />
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('title'),
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },
    headerRight: (
        <Button title="Edit" color="orange"
            onPress={() => screenProps.navigation.navigate("Edit", {movie: screenProps.navigation.getParam('movie')})}
        />
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10,
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
    },
    description: {
        fontSize: 20,
        color: 'white',
        padding: 10,
    },  
    starContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    orange: {
        color: 'orange',
    },
    white: {
        color: 'white',
    },
    purple: {
        color: 'purple',
    },
    grey: {
        color: 'grey',
    }
});

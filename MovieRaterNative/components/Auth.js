import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Auth(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [regView, setRegView] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const auth = () => {   
        if(regView) {
            fetch(`http://192.168.1.118:8000/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            .then(res => res.json())
            .then(res => {
                setRegView(false)
            })
            .catch(err => console.error(err))    
        }else {
            fetch(`http://192.168.1.118:8000/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            .then(res => res.json())
            .then(res => {                
                getData(res.token)
                props.navigation.navigate("MovieList")
            })
            .catch(err => console.error(err))    
        }                              
    }
    const getData = async () => {
        const token = await AsyncStorage.getItem('MR_Token');
        if(token) props.navigation.navigate("MovieList")
    }
    const toggleView = () => {
        setRegView(!regView);
    }

    return (
        <View style={styles.container}>    
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                autoCapitalize={'none'}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            <Button onPress={() => auth()} title={regView ? "Register" : "Login"} />
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ? <Text style={styles.viewText}>Aready have an account? Go back to login.</Text> :
                <Text style={styles.viewText}>Don't have an account? Register here.</Text>}
            </TouchableOpacity>
        </View>
    );
}

Auth.navigationOptions = screenProps => ({
    title: "Login",
    headerStyle: {
        backgroundColor: 'orange'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24
    },    
})

const removeClicked = (props) => {
    const movie = props.navigation.getParam('movie')
    console.log(movie);
    fetch(`http://192.168.1.118:8000/api/movies/${movie.id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token be7620259c170ae45df8924770acdab9be02ac3d`
        }
    })    
    .then(res => {
        props.navigation.navigate("MovieList")
    })
    .catch(err => console.error(err))
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10,
    },
    label: {
        fontSize: 24,
        color: 'white',
        padding: 10,
    },
    input: {
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,

    }
});

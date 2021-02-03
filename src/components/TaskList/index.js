import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Touchable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList( {data, handleDelete} ){
    return(
        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
            <TouchableOpacity onPress={ () => handleDelete(data)}>
                <Ionicons name="md-checkmark-circle" size={30} color="#bf5f82" />
            </TouchableOpacity>
            
            <View>
                <Text style={styles.texto}> {data.task} </Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3,
        }
    },

    texto:{
        color: 'black',
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 20,
    },

});

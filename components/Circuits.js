import React from 'react';
import { StyleSheet, FlatList, Text, View, RefreshControl, Button } from 'react-native';
import { Icon } from 'react-native-elements';

const SERVER_URL = 'https://bikebaru-server.herokuapp.com';

export default class Circuits extends React.Component {

    constructor() {
        super();
        this.state = {
            circuits: [],
        };
    }

    componentDidMount() {
        this.loadCircuits();
    }

    /* List Circuits */
    loadCircuits = () => {
        fetch(SERVER_URL + '/circuits/')
            .then(response => response.json())
            .then(response => this.setState({
                circuits: response.data,
            }))
            .catch(err => console.log(err))
    }

    /* Get Circuits */
    static getCircuits() {
        return fetch(SERVER_URL + '/circuits/')
            .then((response) => {
                return response.json();
            })

            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name='refresh' type='foundation' onPress={this.loadCircuits} />
                <FlatList data={this.state.circuits} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: '#2f95dc', padding: 10, margin: 10, alignItems: "center" }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.initial_location} > {item.final_location}</Text>
                            <Text>Distância: {item.distance} km | Tempo: {item.time}</Text>
                            <Text>Velocidade Média: {item.velocity} km/h</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
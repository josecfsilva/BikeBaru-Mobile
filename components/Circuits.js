import React from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'

export default class Circuits extends React.Component {
    constructor() {
        super();
        this.state = {
            circuits: [],
        };
    }

    componentDidMount() {
        this.showCircuits();
    }

    showCircuits = _ => {
        fetch('http://192.168.1.74:4000/circuits/')
            .then(response => response.json())
            .then(response => this.setState({
                circuits: response.data
            }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.circuits} keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <View style={{ backgroundColor: '#2f95dc', padding: 10, margin: 10 }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ color: '#fff' }}>{item.initial_location} > {item.final_location}</Text>
                            <Text>Tempo: {item.time} | Distância: {item.distance} km | Velocidade: {item.velocity} km/h</Text>
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
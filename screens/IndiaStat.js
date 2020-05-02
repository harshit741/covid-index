import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fetchIndiaData } from '../src/api/StateData'
import { updatelog} from '../src/api/StateData'
import TimeAgo from 'react-native-timeago'



export class Current extends Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmed: null,
            active: null,
            recovered: null,
            deceased: null,
            delta: {
                confirmed: null,
                recovered: null,
                deceased: null
            },
            update:{
                log: '',
                timestamp: null
            },
            update2:{
                log: '',
                timestamp: null
            }
        }
    }

    async componentDidMount() {

        const log = await updatelog(data)
        const data = await fetchIndiaData(data)

        if (typeof data === "object") {
            var latest = data.data.statewise[0]
            var update = log.data
            console.log()                
            this.setState({
                confirmed: latest.confirmed.toLocaleString(),
                active: latest.active,
                recovered: latest.recovered,
                deceased: latest.deaths,
                delta: {
                    confirmed: latest.deltaconfirmed,
                    recovered: latest.deltarecovered,
                    deceased: latest.deltadeaths
                },
                update: {
                    log:update[update.length-1].update,
                    timestamp: new Date(update[update.length-1].timestamp * 1000)
                },
                update2:{
                    log:update[update.length-2].update,
                    timestamp: (update[update.length-2].timestamp * 1000)
                }
                
            })
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.location}>
                        INDIA
                    </Text>
                </View>
                <View style={styles.dataContainer}>
                    <View style={[styles.data, { borderBottomColor: '#ff0000' }]}>
                        <Text style={styles.title}>Confirmed</Text>
                        <Text style={[styles.dataNumbers, { color: '#ff0000' }]}>{this.state.confirmed}</Text>
                        <Text>{this.state.delta.confirmed > 0 ? '+' + this.state.delta.confirmed : null}</Text>
                    </View>
                    <View style={[styles.data, { borderBottomColor: '#3c6ff8' }]}>
                        <Text style={styles.title}>Active</Text>
                        <Text style={[styles.dataNumbers, { color: '#3c6ff8' }]}>{this.state.active}</Text>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <View style={[styles.data, { borderBottomColor: '#00be3f' }]}>
                        <Text style={styles.title}>Recovered</Text>
                        <Text style={[styles.dataNumbers, { color: '#00be3f' }]}>{this.state.recovered}</Text>
                        <Text>{this.state.delta.recovered > 0 ? '+' + this.state.delta.recovered : null}</Text>
                    </View>
                    <View style={[styles.data, { borderBottomColor: '#4d4d4d' }]}>
                        <Text style={styles.title}>Deceased</Text>
                        <Text style={[styles.dataNumbers, { color: '#4d4d4d' }]}>{this.state.deceased}</Text>
                        <Text>{this.state.delta.deceased > 0 ? '+' + this.state.delta.deceased : null}</Text>
                    </View>
                </View>
                <View style={{marginVertical:5,}}>
                    <View style={styles.log}>
                        <Text>{this.state.update.log}</Text>
                        <Text style={styles.timestamp}>Updated <TimeAgo time={this.state.update.timestamp} /></Text>
                    </View>
                    <View style={styles.log}>
                        <Text style={styles.log}>{this.state.update2.log}</Text>
                        <Text style={styles.timestamp}>Updated <TimeAgo time={this.state.update2.timestamp} /></Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Current

const styles = StyleSheet.create({
    container: {
        padding: 0,
        marginHorizontal: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    location: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
        elevation: 3,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    data: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 4,
        margin: 5,
        height: 110,
        maxHeight: 150,
        alignItems: "center",
        borderBottomWidth: 3
    },
    dataContainer: {
        flexDirection: 'row',
        margin: 5,
        marginBottom: 0
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    dataNumbers: {
        fontSize: 30
    },
    log:{
        backgroundColor: '#fff',
        marginVertical:2,
        paddingVertical:3,
        paddingHorizontal:8,
        borderRadius: 10,
    },
    timestamp:{
        color: '#aaaaaa',
        textAlign:'right',
        paddingHorizontal:8
    },
    logView:{

    }
})
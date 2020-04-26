import React, { Component } from 'react'
import { View } from 'react-native'
import {Appbar} from 'react-native-paper'


export class Feeds extends Component {
    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Action icon="rss"/>
                    <Appbar.Content title="Feeds"/>
                </Appbar.Header>
            </View>
        )
    }
}

export default Feeds

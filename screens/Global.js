import React, { Component } from 'react'
import { View } from 'react-native'
import {Appbar} from 'react-native-paper'

export class Global extends Component {
    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Action icon="menu"/>
                    <Appbar.Content title="Global"/>
                </Appbar.Header>
            </View>
        )
    }
}

export default Global

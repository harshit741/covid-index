import React, { Component } from 'react'
import { View } from 'react-native'
import {Appbar} from 'react-native-paper'



export class Faq extends Component {
    render() {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Action icon="help-circle-outline"/>
                    <Appbar.Content title="FAQ"/>
                </Appbar.Header>
            </View>
        )
    }
}

export default Faq

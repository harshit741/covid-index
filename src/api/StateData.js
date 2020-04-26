import axios from 'axios'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

const url = 'https://api.covid19india.org/state_district_wise.json'

export const fetchData = async ()  =>  {
    try {
        const {data: { Assam:{districtData:{Cachar}} }} = await axios.get(url)
        return {Cachar}
    } catch (error) {
        
    }
}
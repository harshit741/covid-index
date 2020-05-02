import axios from 'axios'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

const url1 = 'https://api.covid19india.org/state_district_wise.json'
const url2 = 'https://api.covid19india.org/data.json'
const url3 = 'https://api.covid19india.org/updatelog/log.json'

export const fetchData = async ()  =>  {
    try {
        const {data} = await axios.get(url1)
        return {data}
    } catch (error) {
    
    }
}
export const fetchIndiaData = async () => {
    try {
        const {data} = await axios.get(url2)
        return {data}
    } catch (error) {
        
    }
}
export const updatelog =async () => {
    try {
        const {data} = await axios.get(url3)
        return {data}  
    } catch (error) {
        
    }
}
import React,{useState} from 'react'
import {View,  StyleSheet, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export const GalleryList =({data,onePhoto})=>{
    return(
    <TouchableOpacity activeOpacity={0.7} onPress={()=>onePhoto(data)}>
    <Image style={styles.image} source={{uri:data.image}}/>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 90,
      height: 90,
      margin: 2.6
    }
  })
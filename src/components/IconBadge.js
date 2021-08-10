import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Platform,Image,TextInput,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export const IconBadge= ({info,goToNews}) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    
    return(
        <>
      <Wrapper onPress={()=>goToNews()}>
      <MaterialCommunityIcons name="email-newsletter" size={40} color="black"/>
       </Wrapper>
       {
        info.length > 0 ?
        <View style={{ position: 'relative', right: 10, top: 5, backgroundColor: 'red', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:10 }}>{info.length}</Text>
        </View> : null
    }
    </>
       
    )
}
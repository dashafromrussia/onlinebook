import React from 'react'
import {View, Text, StyleSheet,TouchableOpacity,Image} from 'react-native'

export const MyMessage = ({data,removeMess}) =>{
  return(
    <TouchableOpacity activeOpacity={0.7} onPress={()=>removeMess(data.id)}>
      <View>
          <Text style={styles.name}>{data.name}:</Text>
          <Text>{data.mess}</Text>
          {data.images.map(elem=>
          <Image key={elem.id} style={styles.image} source={{uri:elem.image}}/>)}
      </View>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    },
    name:{
      fontFamily:'open-bold'
    }
  })

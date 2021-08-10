import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, View, ScrollView, TouchableOpacity,Image,StyleSheet} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'


export const LikeScreen = ({navigation}) => {
const name = navigation.getParam('name') 
const likepost = useSelector(state => state.post.likepost)
const myLike = likepost.filter(el=>el.name===name)
const gallery = useSelector(state => state.post.gallery)

const onePhoto =(id)=>{
  const findData = gallery.find(el=>el.id===id)
  navigation.navigate('Photo',{data:findData,name:name})
}

return(
    <ScrollView>
        <View style={styles.container}>
      {myLike.map(el=>
          <TouchableOpacity activeOpacity={0.7}  key={el.id.toString()} onPress={()=>onePhoto(el.idpost)}>
            <Image style={styles.image} source={{uri:gallery.find(elem=>elem.id===el.idpost).image}}/>
          </TouchableOpacity>
        )}
        </View>
    </ScrollView>
)  
}

const styles = StyleSheet.create({
    container:{
      flexWrap:"wrap",
      alignContent:'flex-start',
       width:'100%',
      flexDirection:'row',
      paddingLeft:8
  
    },
    image: {
        width: 90,
        height: 90,
        margin: 2.6
      }
})
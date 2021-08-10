import React,{useState,useRef,useEffect} from 'react'
import {View,  StyleSheet, Image,find} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EditModal } from '../components/EditModal'


export const ImageWithModal =({image}) =>{
    const[modal, setModal] = useState(false)
    return(
       <TouchableOpacity activeOpacity={0.7} onPress={()=>setModal(true)}>
           <EditModal image={image} visible={modal} onCancel={()=>setModal(false)}/>
          <Image style={styles.image} source={{uri:image}}/>
       </TouchableOpacity> 
    )
}


const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })



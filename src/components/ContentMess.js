import React,{useState,useEffect,useRef,useImperativeHandle } from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image,findNodeHandle} from 'react-native'
import { EditModal } from './EditModal'
import { ImageWithModal } from './ImageWithModal'

export const ContentMess = ({data,removeMess,name,redirectMess,onePhoto}) =>{

  const [color,setColor]=useState('#AFEEEE')
  const [margin,setMargin]=useState(7)
  let redirect = data.redirect
  
  useEffect(()=>{
    if(data.name===name && data.new==="yes"){
        setColor("#ffccdd")
      }else{
        setColor('#AFEEEE')
      }
   },[data.new])

  useEffect(()=>{
   if(data.name===name){
        setMargin(60)
   }
  },[data.name])

  return(
    <> 
    <TouchableOpacity activeOpacity={0.7} onLongPress={()=>removeMess(data.id)} onPress={()=>redirectMess(data)}>
      <View padding={10} style={styles.mes} marginLeft ={margin} backgroundColor={color}> 
      <Text style={styles.name}>{data.name}:</Text>
          <Text>{data.mess}</Text>     
          {data.images.map(elem=>
          <TouchableOpacity key={elem.id.toString()} activeOpacity={0.7} onLongPress={()=>console.log("a")}>
          <ImageWithModal image={elem.image}/>
          </TouchableOpacity>
          )}
        {data.sharepost.map(el=><TouchableOpacity key={el.id} activeOpacity={0.7} onPress={()=>{onePhoto(el)}}>
              <Text style={styles.text}>"Пост из галереи от {el.name}"</Text>
                <Image style={styles.imagemini} source={{uri:el.image}}/> 
            </TouchableOpacity>)}    
      {redirect.map(el=>
              <View backgroundColor="pink" key={el.id}>
                <Text>{el.name}</Text>
                <Text>{el.mess}</Text>
                {el.images.map(elem=>
                <TouchableOpacity key={elem.id.toString()} activeOpacity={0.7} onLongPress={()=>console.log("a")}>
                  <ImageWithModal key={elem.id.toString()} image={elem.image}/>
                </TouchableOpacity>
                )}
                {el.sharepost.map(el=><TouchableOpacity key={el.id} activeOpacity={0.7} onPress={()=>{onePhoto(el)}}>
                  <Text style={styles.text}>"Пост из галереи от {el.name}"</Text>
                  <Image style={styles.imagemini} source={{uri:el.image}}/> 
                </TouchableOpacity>)} 
              </View>
            )}
      </View>
      </TouchableOpacity>  
      </>
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
    },
    imagemini:{
      width: 70,
      height: 70
    },
    text:{
     fontFamily:'open-bold' 
    },
    mes:{
      borderWidth: 2,
      borderColor:"white",
      padding:5,
      borderRadius:10,
      marginTop:10,
      marginBottom:10,
      marginRight:5
    }
  })

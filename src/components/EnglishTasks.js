import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, Text, View, ScrollView,TextInput,StyleSheet,Image} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { Historylist } from '../components/Historylist'
import { DB } from '../db'

export const EnglishTasks = ({data,giveAnswer,index,changeCountAnsw,disabled}) => {//подобие дуолингво перевод
   // const[sent,setSent]=useState('')//вариант со строками
    const[sentshow,setSentshow]=useState([])
    const[visible,setVisible]=useState(true)
    const [val,setVal]=useState('')
    const [disable,setDisable]=useState(false)
 //let data ={id:"1",task:"переведите предложение",contain:"я люблю еду",right:"I like food",buttons:"I meat food love instead like ear"}
 let right = data.right.split(" ")

 let buttonsmass =[]
 if(data.type=="buttons"){
 let buttonsstr = data.buttons.split(" ")//набор слов из которых должно быть составлено предложение
buttonsstr.forEach((el,index)=>{
  buttonsmass = [...buttonsmass,{id:index,button:el,visi:true}]
})
 }
const[buttons,setButtons]=useState(buttonsmass)


 let rightstr=""
 right.forEach(el=>{
   rightstr = rightstr+el
 })


 const consistSent =(word)=>{
   //setSent(prev=>prev+word.button)//вариант со строками
   setSentshow(prev=>[...prev,word])
   setButtons(prev=>prev.map(el=>{
       if(el.id===word.id){
           el.visi = false
       }
       return el
   }))
 }

 const check =()=>{
    let answer=''
     if(data.type==="buttons"){
     sentshow.forEach(el=>{
        answer = answer+el.button
      })
    }else{
      if(val.trim()==""){
        Alert.alert("Введите перевод!")
        return false
      }
  val.trim().split(' ').forEach(el=>
                   answer=answer+el)
       if(answer.slice(answer.length-1)=="."){
        answer = answer.slice(0,answer.length-1)
       }          
    }
    if(rightstr.trim()===answer){
        Alert.alert('You a right!')
        changeCountAnsw() //каунт отвечающ за баллы ++
    }else{
       Alert.alert(`Wrong! Right:${data.right}`)
    }
    // setVisible(false)
    setDisable(true)
    giveAnswer(data.index)
    disabled()
     //console.log(rightstr,answer)
 }

 const deleteWord =(word)=>{
    /*let difference = sent.length-word.button.length//вариант со строками
    const find = sent.substring(difference, sent.length) 
    let slise = sent.slice(0, difference)
   if(find===word.button){*/
   setButtons(prev=>prev.map(el=>{
        if(el.id===word.id){
            el.visi = true
        }
        return el
    }))
    setSentshow(prev=>prev.filter(el=>el.id!==word.id))
    //setSent(slise)
//}
}

    return(<ScrollView>
        {visible&&<View padding={10}>
        <Text style={styles.text}>Задание: {data.task}.</Text>
        <Text style={styles.texterror}>{data.contain}</Text>
        {data.type==="buttons"? <View>
        <View style={styles.block} paddingVertical={10}>
           {sentshow.map((el,index)=><View key={index} paddingVertical={3} paddingHorizontal={5}><Button color="hotpink" title={el.button} onPress={()=>deleteWord(el,index)}/></View>)} 
            </View>
            <View style={styles.blockimg}>
            <Image style={styles.image} source={{uri:data.image}}/>  
            </View>
        <View style={styles.block} paddingVertical={10}>
           {buttons.map((el,index)=>el.visi&&<View key={index} paddingVertical={3} paddingHorizontal={5}><Button color="green" title={el.button} onPress={()=>consistSent(el)}/></View>)} 
            </View>
            </View>:
        <View>
        <Image style={styles.image} source={{uri:data.image}}/>  
        <TextInput placeholder="Введите перевод.." value={val} width={230} onChangeText={setVal}/>
        </View>
            }
    <Button title="Проверить" disabled={disable} color="red" onPress={check}/>
        </View>}
    </ScrollView>
        )

}

const styles = StyleSheet.create({
    
    text:{
      fontFamily:'open-bold',
      fontSize:20
    },
    block:{
      /*flexDirection:"row",
      alignItems:"center"*/
      flexWrap:"wrap",
      alignContent:'flex-start',
       width:'100%',
      flexDirection:'row',
      paddingLeft:8
    },
    texterror:{
      fontFamily:'open-bold',
      color:"red",
      fontSize:25
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 300,
      height: 200
    },
    blockimg:{
     marginHorizontal: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
  
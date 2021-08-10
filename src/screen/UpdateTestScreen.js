import React,{useState} from 'react'
import {View, Text, StyleSheet,TextInput, Button,ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateTest } from '../components/UpdateTest'
import { updateThemeTest} from '../store/actions/post'
import { Tooltip} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'

export const UpdateTestScreen = ({navigation}) => {
   const data = navigation.getParam('data')
   const [test,setTest]=useState(data.test)
   const[theme,setTheme]=useState(data.name) //тема теста
   const dispatch = useDispatch()
   
   const updateThem =()=>{
       let info = {id:data.id,name:theme}
    dispatch(updateThemeTest(info))
    navigation.navigate('Alltest')
   }
const navigates =()=>{
    navigation.navigate('Alltest')
}

  
const addBlock =()=>{
   setTest((prev)=>{
        return(
        [...prev,{id:Date.now().toString(),quest:'',answer:'',variants:[]}]
        )
    })
    console.log('DATA',data)
}

//let all={id:id,quest:value,first:first,second:second,third:third,answer:answer}
    return(
    <ScrollView>
        <View padding={10}>
        <Tooltip backgroundColor="azure" width={200} height={100} overlayColor='rgba(0, 0, 0, 0.7)' popover={<Text>При добавлении нового вопроса,убедитесь,что ученики еще не прошли данный тест</Text>}>
        <View marginTop={10} marginBottom={10}>
          <Entypo name="help-with-circle" size={28} color="crimson"/> 
        </View>
        </Tooltip>
        <Text>Обновить название темы теста</Text>
        <TextInput placeholder="Введите название темы" value={theme} onChangeText={setTheme}/>
        <Button title="Oбновить название" color="mediumvioletred" onPress={updateThem}/>
        <Text>Обновить параметры</Text>
        {test.map((elem)=>{
            return(
                <UpdateTest key={elem.id} data={elem} id={data.id} nav={navigates}/>
            )
        })}
        <Button title="Добавить новый блок" color="mediumvioletred" onPress={addBlock}/>
        </View>
    </ScrollView>
    )
}
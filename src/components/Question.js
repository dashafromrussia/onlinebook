import React, { useState } from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,TextInput, Button} from 'react-native'
import { InputVariants } from './InputVariants'



export const Question = ({id,save}) =>{
    const [variants,setVariants]=useState([])
    const [add,setAdd] = useState([])
    const[value,setValue]=useState()
    /*const[first,setFirst]=useState()
    const[second,setSecond]=useState()
    const[third,setThird]=useState()*/
    const[answer,setAnswer]=useState()
    const[visible,setVisible]=useState(true)
   
    const saveQuest =()=>{
    // let all={id:id,quest:value,first:first,second:second,third:third,answer:answer}
    let all={id:id,quest:value,answer:answer,variants:variants}
     save(all)
    setVisible(false)
    }

    const saveVariants =(data)=>{
      setVariants(prev=>[...prev,{...data}])
    }

    const addblockVariants =()=>{
      setAdd(prev=>[...prev,Date.now().toString()])
    }

let content =(<View padding={20}>
  <View>
  <TextInput
   placeholder="Введите вопрос"
   value={value}
   onChangeText={setValue}
   multiline
   />
   </View>
  {add.map((el,index)=><InputVariants key={el} id={el} index={index+1} saveVariants={saveVariants}/>)}
  <Button title="Добавить вариант ответа" onPress={addblockVariants}/>
 <Text>Если несколько вариантов ответа,введите цифры правильных через запятую, пр(1,2,3).</Text>
 <TextInput
 placeholder="Введите цифры правильного ответа"
 value={answer}
 onChangeText={setAnswer}
 />
 <Button title="Записать вопрос" color="black" onPress={saveQuest}/>
</View>)

/*let content =(<View padding={20}>
  <View>
  <TextInput
   placeholder="Введите вопрос"
   value={value}
   onChangeText={setValue}
   multiline
   />
   </View>
   <View>
   <Text>1</Text>   
   <TextInput
   placeholder="Введите первый вариант ответа"
   value={first}
   onChangeText={setFirst}
   multiline
   />
   
   </View>
    <TextInput
   placeholder="Введите цифру правильного ответа"
   value={answer}
   onChangeText={setAnswer}
   />
   <Button title="Записать вопрос" color="black" onPress={saveQuest}/>
  </View>)*/

  return(
      <View>
    {visible&&content}
    </View>
  )
}
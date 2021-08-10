import React,{useState} from 'react'
import {View, Text, StyleSheet,TextInput,Image, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateTests,deleteQuest} from '../store/actions/post'
import { UpdateVariants } from './UpdateVariants'


export const UpdateTest = ({data,id,nav}) =>{
    const [flag,setFlag]=useState(true) 
    const [value, setValue] = useState(data.quest)
   /* const [first, setFirst] = useState(data.first)
    const [second, setSecond] = useState(data.second)
    const [third, setThird] = useState(data.third)*/
    const [variants,setVariants] = useState(data.variants)
    const [answer,setAnswer] = useState(data.answer)
    const dispatch = useDispatch()
    const allTests = useSelector(state => state.post.test)
    const findTests = allTests.find(el=>el.id===id)
    const filterTest = findTests.test.filter(el=>el.id!==data.id)
//let all={id:id,quest:value,first:first,second:second,third:third,answer:answer}
 
     
       
       let info = [...filterTest,{id:data.id,quest:value,
       variants: variants,
        answer: answer}]

       info.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)

        const getInfo = ()=>{
         let change ={id:id,
          test:info,
          }
          console.log(change)
         dispatch(updateTests(change))
         nav()
          }


          let removequest={
            id:id,
            test:filterTest
           }
           
       const removeData =()=>{
       deleteQuest(removequest)(dispatch)
        setValue('')
         /*setFirst('')
         setSecond('')
         setThird('')*/
        setAnswer('')
         setFlag(false)
         nav()
       }

      const removeVariant=(id)=>{
        setVariants(prev=>prev.filter(el=>el.id!==id))
      }

      const changeVariant=(id,data)=>{
        setVariants(prev=>prev.map(el=>{
          if(el.id===id){
            el.variant = data
          }
          return el
        }))
      }

      const addVariant =()=>{
       setVariants(prev=>[...prev,{id:Date.now().toString(),variant:""}])
      }
          
  return(
       <View>
      {flag&&<TextInput
       placeholder="Введите вопрос"
       value={value}
       onChangeText={setValue}
       multiline
       />}
      {flag&&<TextInput
       placeholder="Введите правильный ответ"
       value={answer}
       onChangeText={setAnswer}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />}
     {variants.map(el=><UpdateVariants key={el.id} data={el} removeVariant={removeVariant} changeVariant={changeVariant}/>)}  
    {flag&&<Button title="Добавить вариант ответа" onPress={addVariant}/>}
    {flag&&<Button title="Удалить вопрос теста" color="lightpink" onPress={removeData}/>}
    {flag&&<Button onPress={getInfo} title="Обновить данные" color="palevioletred"/>}
  </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })

  /* {flag&&<TextInput
       placeholder="Введите вопрос"
       value={value}
       onChangeText={setValue}
       multiline
       />}
      {flag&&<TextInput
       placeholder="Введите первый вариант"
       value={first}
       onChangeText={setFirst}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />}
        {flag&&<TextInput
       placeholder="Введите второй вариант"
       value={second}
       onChangeText={setSecond}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />}
     {flag&&<TextInput
       placeholder="Введите третий вариант"
       value={third}
       onChangeText={setThird}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />}
    {flag&&<TextInput
       placeholder="Введите правильный ответ"
       value={answer}
       onChangeText={setAnswer}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />} */ 
import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert, Dimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '../components/Checkbox'
import { delTest, oneTestWithColor, sendTest } from '../store/actions/post'
import { Tooltip} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'


export const TestScreen = ({navigation}) => {
  
  const data = navigation.getParam('data')
  const test = useSelector(state => state.post.onetest) //тест уже с цветом,скр блоками..манипуляции проводили в тестлист
  const [width,setWidth] = useState(0)
  const [disable,setDisable]=useState(false)
  const [count,setCount]=useState(0)
  const [result,setResult] = useState([])
  const [visibility,setVisibility] = useState(false)
  const visible= navigation.getParam('visible')
  const name = navigation.getParam('name')
  const dispatch =useDispatch()
  

  
    useEffect(()=>{
      if(test.length===result.length){ //если кол-во ответов равно кол-ву вопросов теста,то показ кнопку закончить тест
        setVisibility(true)
      }
     //console.log(test)
    },[result.length])


    const countAnswer =(plus)=>{
     setCount(prev=>prev+plus)
    }

    const showResult =(data)=>{
     setResult(prev=>[...prev,{...data}])
    }


  const lookMarks =()=>{
   Alert.alert(`Вы набрали ${count} балл-a(ов)`)
   let time = new Date()
   time=time.toLocaleString()
   let marks ={theme:data.name,name:name,mark:count,time:time,data:result,idtest:data.id,groupname:data.groupname,olimp:data.olimp,city:data.city}
    sendTest(marks)(dispatch)
    setDisable(true)
  }

  const deleteTest =()=>{
    navigation.navigate('Admin')
    delTest(data.id)(dispatch)
  }

  const updateTest =()=>{
   navigation.navigate('Updatetest',{data:data})
  }

  const theNum =(ind)=>{ //для создания тестов с нумерацией
    //console.log(ind)
     let newdata =test.map(el=>{
      if(Number(el.index)===Number(ind)){
        el.color = "black"
       el.visible = true 
      }else{
        el.color = "hotpink"
        el.visible = false 
      }
      return el
    })
     oneTestWithColor(newdata)(dispatch) //чтобы сохр данные скрытия и цв конопок даже после перерисовки компонента..обычн стейты слетают
  }

  const changeWidth =()=>{ //блок будет увеличив по мере прохожд теста
     let block = Dimensions.get('window').width / test.length
    setWidth(prev=>prev+block)
  }

  if(!data){
    return null
  }
    return(
      <ScrollView>
        <View width={width} backgroundColor="red" height={30}></View>
        <View padding={20}>
         <Text style={styles.text}>Тест на тему: "{data.name}"</Text> 
         <Tooltip backgroundColor="azure" height={70} width={200} overlayColor='rgba(0, 0, 0, 0.7)' popover={<Text>Не забываем записывать ответ после каждого вопроса!</Text>}>
        <View marginTop={10} marginBottom={10}>
          <Entypo name="help-with-circle" size={28} color="crimson"/> 
        </View>
        </Tooltip>
        <View flexDirection="row" justifyContent="space-around">
         {test.map((el,index)=><View key={index.toString()} width={Dimensions.get('window').width / test.length}><Button title={(index+1).toString()} color={el.color} onPress={()=>theNum(index)}/></View>)}
        </View>
        {test.map((elem)=>
      elem.visible&&<Checkbox key={elem.id} countAnswer={countAnswer} showResult={showResult} changeWidth={changeWidth} elem={elem} data={result}/>
             )}
        {visibility&&<Button title="Закончить тест" color="palevioletred" onPress={lookMarks} disabled={disable}/>}
         <Button title="Выйти на главную" color="pink" marginTop={20} onPress={()=>navigation.navigate('Main')}/> 
         {visible&&<Button title="Удалить тест" color="mediumvioletred" onPress={deleteTest}/>}
         {visible&&<Button title="Редактировать тест" color="pink" onPress={updateTest}/>}
        </View>
        </ScrollView> 
    )
}

const styles = StyleSheet.create({

  text:{
    fontFamily:'open-bold'
  },
 
})

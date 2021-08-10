import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
//import CheckBox from '@react-native-community/checkbox';
//import { CheckBox } from 'react-native-elements'
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { deletepupils } from '../store/actions/post';
import { RadioButtonscomp } from './RadioButtons';



export const Checkbox = ({elem,countAnswer,showResult,changeWidth,data}) => {
   
    const [disable,setDisable]=useState(false)
    const [anserstr,setAnswerstr] = useState([])
    let rightanswers = elem.answer.split(',') //прав ответы
    rightanswers =  rightanswers.sort((a, b) => Number(a) > Number(b) ? 1 : -1)
    const ouranswer = data.find(el=>el.id===elem.id)
    useEffect(()=>{ //если ответ уже есть в массиве ответов
     if(ouranswer!==undefined){
       setDisable(true)
     }else{
       setDisable(false)
     }
    },[data])

    const saveAnsw =()=>{
      //setDisable(true)
      let myanswer = anserstr.sort((a, b) => Number(a) > Number(b) ? 1 : -1)
      let datas = {id:elem.id,right:elem.answer,myanswer:myanswer.join(','),quest:elem.quest}
      Alert.alert('Ответ записан')
        /*if(myanswer.join(',')===rightanswers.join(',')){
          countAnswer()
        }*/
        myanswer.forEach(elem=>{
          if(rightanswers.find(el=>el===elem)){
            if(rightanswers.length < myanswer.length){//если прав ответов меньше,чем выбрал студент
              countAnswer(0.5)
            }else{
              countAnswer(1)
            }
          }
        })
   showResult(datas)
   changeWidth() //увелич красн блок чверху по мере прохжд теста
   //console.log("my",myanswer.join(','))
   //console.log("right",rightanswers.join(','))
   
    }


    const rightRadioButton =(radio)=>{//выбранные варианты
     setAnswerstr(prev=>[...prev,radio])
    }

    const delVariant =(radio)=>{
      setAnswerstr(anserstr.filter(el=>el!==radio))
    }

    return (
      <View>
        <Text>{elem.quest}</Text>
        {elem.variants.map((el,index)=>
       <RadioButtonscomp key={el.id} el={el} index={index} myanswer={ouranswer} delVariant={delVariant} rightRadioButton={rightRadioButton}/>)}
        <Button title="Записать ответ" color="#BC8F8F" onPress={saveAnsw} disabled={disable}/>
      </View>
    );
}

/*<View>
        <Text>{elem.quest}</Text>
        <Text>{elem.first}</Text>
        <RadioButton
          value="1"
          status={ checked === '1' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('1')}
        />
        <Text>{elem.second}</Text>
        {<RadioButton
          value="2"
          status={ checked === '2' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('2')}
        />}
        <Text>{elem.third}</Text>
         {<RadioButton
          value="3"
          status={ checked === '3' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('3')}
        />}
        <Button title="Записать ответ" color="#BC8F8F" onPress={saveAnsw} disabled={disable}/>
      </View>*/
/* const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
    const [toggleCheckBox3, setToggleCheckBox3] = useState(false)
    const [right,setRight]=useState(0)
    const [visible,setVisible]=useState(true)
    const [disable,setDisable]=useState(false)

    const saveAnsw =()=>{
      let data = {id:elem.id,right:elem.answer,myanswer:right,quest:elem.quest}
      Alert.alert('Ответ записан')
    if(right===elem.answer){
      countAnswer()
     }
    showResult(data) 
    setDisable(true)
    }
   
    return(
      <View>
          {visible&&<Text>{elem.quest}</Text>}
          {visible&&<Text>{elem.first}</Text>}
         {visible&&<CheckBox
           disabled={false}
           value={toggleCheckBox1}
           onValueChange={(newValue) =>{setToggleCheckBox1(newValue)
           setRight('1')
           setToggleCheckBox2(false)
           setToggleCheckBox3(false)
           console.log(right)
           }}
          />}
         {visible&&<Text>{elem.second}</Text>}
          {visible&&<CheckBox
           disabled={false}
           value={toggleCheckBox2}
           onValueChange={(newValue) =>{setToggleCheckBox2(newValue)
         setRight('2')
         setToggleCheckBox1(false)
           setToggleCheckBox3(false)
           console.log(right)
        }}
          />}
        {visible&&<Text>{elem.third}</Text>}
         {visible&&<CheckBox
           disabled={false}
           value={toggleCheckBox3}
           onValueChange={(newValue) =>{setToggleCheckBox3(newValue)
           setRight('3')
           setToggleCheckBox1(false)
           setToggleCheckBox3(false)
           console.log(right)
           }}
          />}
       {visible&&<Button title="Записать ответ" color="#BC8F8F" onPress={saveAnsw} disabled={disable}/>}
       </View>
    )*/
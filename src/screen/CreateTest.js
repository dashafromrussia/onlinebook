import React,{createRef, useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ScrollView,TouchableWithoutFeedback,Keyboard,ImageBackground} from 'react-native'
import { useDispatch } from 'react-redux'
import {Question} from '../components/Question'
import { addTest } from '../store/actions/post'
import { CheckBox, Tooltip } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

export const CreateTest = ({navigation}) => {
    const teacher= navigation.getParam('name')
    const dispatch = useDispatch()
    const[name,setName]=useState('')
    const[quest,setQuest]=useState([])
    const[allquest,setAllquest]=useState([])
    const [checked,setChecked] = useState(false)
    const [checked1,setChecked1] = useState(false)
    const [olimp,setOlimp] = useState('no')
   const [location, setLocation] = useState(null);
   const [lat,setLat]=useState(null)
   const [lon,setLon]=useState(null)
    const [city, setCity] = useState("Oпределяем ваш город...");
    const [namecity,setNamecity] = useState('')
    const [engcity,setEngcity] = useState('')
    const [errorMsg, setErrorMsg] = useState(null);
   const [visible,setVisible] = useState(false)
   const [iscity,setIscity] = useState(false)
    useEffect(()=>{
      if(checked===true){
          setOlimp('yes')
      }else{
          setOlimp('no')
      }
    },[checked])



  
    useEffect(() => {
      (async () => {
        try{
        const { status } = await Permissions.askAsync(
          Permissions.LOCATION
        )
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return 
        }
  
        let loc = await Location.getCurrentPositionAsync({});
      // setLocation({lat:loc.coords.latitude,lon:loc.coords.longitude});
      console.log("loc",loc)
      const resp =  await fetch(`http://whatsthere.maps.sputnik.ru/point?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&apikey="5032f91e8da6431d8605-f9c0c9a00357"`)
       const data = await resp.json()
       console.log("data",data)
     if(data.result.address[0].features[0].properties["address_components"][2].value){
           setCity(`Ваш город ${data.result.address[0].features[0].properties["address_components"][2].value}`)
           translit(data.result.address[0].features[0].properties["address_components"][2].value)
           setLat(data.result.address[0].features[0].geometry.geometries[0].coordinates[1])
           setLon(data.result.address[0].features[0].geometry.geometries[0].coordinates[0])
           setIscity(true)
           setVisible(false)
       }else{
           setCity("Не определен город")
           setVisible(true)
       }
        console.log("address",data.result.address[0].features[0].properties["address_components"][2].value)
    }catch(e){
       setCity("Не определен город")
        setVisible(true)
        setIscity(false)
        console.log("err",e)
    }
      })();
    }, []);
  

    const translit=(word)=>{
      var answer = '';
      var converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya',
     
        'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
        'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
        'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
        'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
        'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
        'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
        'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
      };
     
      for (let i = 0; i < word.length; ++i ) {
        if (converter[word[i]] == undefined){
          answer += word[i];
        } else {
          answer += converter[word[i]];
        }
      }
     setEngcity(answer)
    }



    const addBlock =()=>{
     setQuest((prev)=>[...prev,Date.now().toString()])
    }

    const saveOneQuest =(all)=>{
      setAllquest((prev)=>[...prev,{...all}])
    }

    const saveTest =()=>{
      let sendcity = "none"
      if(checked1===true){
        sendcity = engcity
      }
      console.log(sendcity)
        let data={name:name,test:[...allquest],olimp:olimp,groupname:teacher,city:sendcity}
       addTest(data)(dispatch)
        navigation.navigate('Admin')
        setAllquest([])
        setName('')
        setQuest([])
    }

   const whyCity =async()=>{
  try{
   const response =  await fetch(`http://search.maps.sputnik.ru/search?q=${namecity}&apikey="5032f91e8da6431d8605-f9c0c9a00357"`)
   const data = await response.json()
   // setLocation({lat:data.result[0].position.lat,lon:data.result[0].position.lon})
   translit(namecity)
   setLat(data.result[0].position.lat)
   setLon(data.result[0].position.lon)
    setCity(namecity)
    setVisible(false)
    console.log(data)
  }catch(e){
    console.log("error",e)
    setCity("Город не определен.Попробуйте позжe")
  }
   }


    return(
        <ScrollView padding={5}>
            {<Text style={styles.text}>{city}</Text>}
            {iscity&&<View style={styles.block}>
             <Button title="Yes" color="red" onPress={()=>setIscity(false)}/>
             <Button title="No" color="blue" onPress={()=>{setVisible(true)
                                                            setIscity(false)
                                                           setCity('Не определен город')}}>No</Button>
            </View>}
            {visible&&<View>
              <TextInput placeholder="Введите название своего города" value={namecity} onChangeText={setNamecity}/>
              <Button title="Send" onPress={whyCity}/>
            </View>}
            <Tooltip backgroundColor="azure" overlayColor='rgba(0, 0, 0, 0.7)' height={150} popover={<Text>Олимпиада означает,что результаты данного теста будут общедоступными, и по итогам будет выявлен победитель. </Text>}>
                <View marginTop={10} marginBottom={10}>
                  <Entypo name="help-with-circle" size={28} color="crimson"/> 
               </View>
             </Tooltip>
            <CheckBox
              title="Олимпиада"
              checked={checked}
              onPress={() => setChecked(!checked)}
             />
            <CheckBox
              title="Город"
              checked={checked1}
              onPress={() => setChecked1(!checked1)}
             />
            <TextInput placeholder="Введите название теста" value={name} onChangeText={setName}/>
            {quest.map((elem)=><Question key={elem} id={elem} save={saveOneQuest}/>)}
            <Button title="Добавить вопрос" onPress={addBlock}/>
            <Button title="Сохранить тест" onPress={saveTest}/>
            {allquest.map((elem)=>{
                return(
                    <View key={elem.id}>
                    <Text>{elem.quest}</Text>
                     {elem.variants.map(el=><Text key={el.id}>{el.id}{el.variant}</Text>)}
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text:{
      fontFamily:'open-bold'
    },
    block:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:7
    } 
  })
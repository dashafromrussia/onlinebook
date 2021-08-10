import React,{createRef, useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator} from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

export const RegionResultScreen = ({navigation}) => {
    const teacher= navigation.getParam('name')
    const dispatch = useDispatch()
    const [city, setCity] = useState("Oпределяем ваш город...");
    const [namecity,setNamecity] = useState('')
    const [engcity,setEngcity] = useState('none')
    const [errorMsg, setErrorMsg] = useState(null);
   const [visible,setVisible] = useState(false)
   const [iscity,setIscity] = useState(false)
   const [data,setData] = useState('city')
   const [mass,setMass] = useState([{title:"city",color:"black"},
   {title:"groupname",color:"hotpink"},{title:"olimp",color:"hotpink"}])

  const marks = useSelector(state => state.post.marks)
  marks.sort((a, b) => Number(a.mark) > Number(b.mark) ? 1 : -1)
  let sortcity ={}
  let citymarks= marks.filter(el=>el.city===engcity)
  citymarks.forEach(el=>{
    if(!sortcity[el.theme]){
      sortcity[el.theme] = [{...el}]
    }else{
      sortcity[el.theme] = [...sortcity[el.theme],{...el}]
    }
  })

  let sortolimp = {}
  let olimpmarks = marks.filter(el=>el.olimp==="yes")
  olimpmarks.forEach(el=>{
    if(!sortolimp[el.theme]){
      sortolimp[el.theme] = [{...el}]
    }else{
      sortolimp[el.theme] = [...sortolimp[el.theme],{...el}]
    }
  })

  let sortgroup ={}
  let groupmarks = marks.filter(el=>el.groupname===teacher)
  groupmarks.forEach(el=>{
    if(!sortgroup[el.theme]){
      sortgroup[el.theme] = [{...el}]
    }else{
      sortgroup[el.theme] = [...sortgroup[el.theme],{...el}]
    }
  })
   
  useEffect(() => {
    navigation.setParams({ data:data })
  }, [data])
 
  
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
      console.log("loc",loc)
      const resp =  await fetch(`http://whatsthere.maps.sputnik.ru/point?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&apikey="5032f91e8da6431d8605-f9c0c9a00357"`)
       const data = await resp.json()
       console.log("data",data)
     if(data.result.address[0].features[0].properties["address_components"][2].value){
           setCity(`Ваш город ${data.result.address[0].features[0].properties["address_components"][2].value}`)
           translit(data.result.address[0].features[0].properties["address_components"][2].value)
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


   const whyCity =async()=>{
  try{
   const response =  await fetch(`http://search.maps.sputnik.ru/search?q=${namecity}&apikey="5032f91e8da6431d8605-f9c0c9a00357"`)
   const data = await response.json()
   translit(namecity)
    setCity(namecity)
    setVisible(false)
    console.log(data)
  }catch(e){
    console.log("error",e)
    setCity("Город не определен.Попробуйте позжe")
  }
   }

   const changeData =(data)=>{
    setData(data)
    let items = mass.map(el=>{
      if(el.title===data){
        el.color = "black"
      }else{
        el.color = "hotpink"
      }
      return el
    })
    setMass(items)
  }

if(data==='city'){
    return(
        <ScrollView>
          <View flexDirection="row" justifyContent="space-around">
         {mass.map(el=><View key={el.title} width={150}><Button key={el.title} title={el.title} color={el.color} onPress={()=>changeData(el.title)}/></View>)}
          </View>
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
            {engcity==="none" || iscity===true || visible===true ? 
            <View style={styles.center}>
               <ActivityIndicator size={70} color="hotpink"/>
            </View>
            :engcity!=="none" && iscity===false && visible===false && marks.length===0 ?
            <Text>Результаты пока отсутствуют...</Text>:
             <View>
             <Text style={styles.header}>Результаты городских тестов:</Text>
             {Object.keys(sortcity).map(el=><View key={el}>
               <Text style={styles.header}>Тема:{el}</Text>
               {sortcity[el].map(elem=>
              <View key={elem.id}>
               <Text style={styles.bold}>Дата теста:{elem.time}</Text>
               <Text style={styles.theme}>Город:{elem.city}</Text>
               <Text>Имя студента:{elem.name}</Text>
               <Text>Оценка: "{elem.mark}"</Text>
              </View>
               )}
               <Text style={styles.theme}>Победитель:{sortcity[el][sortcity[el].length-1].name}</Text> 
             </View>)}
         </View>
             }
             {/*<Button title="ttttt" onPress={()=>console.log(city)}/>*/}
        </ScrollView>
    )
            }else if(data==='olimp'){
              return(<View>
                       <View flexDirection="row" justifyContent="space-around">
                       {mass.map(el=><View key={el.title} width={150}><Button key={el.title} title={el.title} color={el.color} onPress={()=>changeData(el.title)}/></View>)}
                        </View>
                <Text style={styles.header}>Результаты олимпиадных тестов:</Text>
                {/*olimpmarks.reverse().map(el=>
                 <View padding={10} key={el.id}>
                  <Text style={styles.bold}>Дата теста:{el.time}</Text>
                  <Text style={styles.theme}>Тема теста:{el.theme}</Text>
                  <Text style={styles.theme}>Имя ученика:{el.name}</Text>
                  <Text>Город:{el.city}</Text>
                  <Text>Оценка: "{el.mark}"</Text>
                 </View> 
                )*/}
              {Object.keys(sortolimp).map(el=><View key={el}>
               <Text style={styles.header}>Тема:{el}</Text>
               {sortolimp[el].map(elem=>
              <View key={elem.id}>
               <Text style={styles.bold}>Дата теста:{elem.time}</Text>
               <Text style={styles.theme}>Город:{elem.city}</Text>
               <Text>Имя студента:{elem.name}</Text>
               <Text>Оценка: "{elem.mark}"</Text>
              </View>
               )}
               <Text style={styles.theme}>Победитель:{sortolimp[el][sortolimp[el].length-1].name}</Text> 
             </View>)}
            </View>)
            }else{
             return(<View>
                    <View flexDirection="row" justifyContent="space-around">
                      {mass.map(el=><View key={el.title} width={150}><Button key={el.title} title={el.title} color={el.color} onPress={()=>changeData(el.title)}/></View>)}
                    </View>
              <Text style={styles.header}>Результаты групповых тестов:</Text>
              {Object.keys(sortgroup).map(el=><View key={el}>
               <Text style={styles.header}>Тема:{el}</Text>
               {sortgroup[el].map(elem=>
              <View key={elem.id}>
               <Text style={styles.bold}>Дата теста:{elem.time}</Text>
               <Text style={styles.theme}>Город:{elem.city}</Text>
               <Text>Имя студента:{elem.name}</Text>
               <Text>Оценка: "{elem.mark}"</Text>
              </View>
               )}
               <Text style={styles.theme}>Победитель:{sortgroup[el][sortgroup[el].length-1].name}</Text> 
             </View>)}
          </View>)
            }
}

RegionResultScreen.navigationOptions = ({ navigation }) => {
  const data = navigation.getParam('data')
  return {
    headerTitle: data
  }
}

const styles = StyleSheet.create({
    text:{
      fontFamily:'open-bold',
      fontSize:17
    },
    block:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:7
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      bold:{
        fontFamily:'open-bold',
        color:'black',
        fontSize:17
      },
      theme:{
        fontFamily:'open-bold',
        color:"red",
        fontSize:17
      }, 
      header:{
        fontFamily:'open-bold',
        color:'blue',
        fontSize:17
      }
  }) 
import React,{useEffect,useState,useCallback} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput, TouchableOpacity,ActivityIndicator} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { BadgeComponent } from '../components/BadgeComponent'
import { IconBadge } from '../components/IconBadge'
import { DB } from '../db'
import { newBadge, oldlikePost, readsComment,removeFriend,oldFriend,loadDropAnswer, addPupil, loadDropList, loadLikePost, loadMarks, loadMessage,loadPupils, loadsComments, loadsConf, loadsConfPerson, loadsGallery, loadTest, loadThemes, addTeacher, loadsTeachers, loadsHistory, loadEnglishTask, loadEnglishResult } from '../store/actions/post'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ModalLogin } from '../components/ModalLogin'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import  {AppHeaderIcon} from '../components/AppHeaderIcon'


export const AdminScreen = ({navigation}) => {
  //const [data,setData]=useState('')//проверяли на работоспособность кнопки и инпут в шапке профиля
  //const [testmass,setTestmass] = useState([])//проверяли на работоспособность кнопки и инпут в шапке профиля
  const[disable,setDisable]=useState(true)
  const [name,setName]=useState('')
  const [modal,setModal] =useState(true)
 
    const loading = useSelector(state => state.post.loading)
    const loadinglike = useSelector(state => state.post.loadinglike)
    const loadingcomment = useSelector(state => state.post.loadingcomment)
    const findname = name.substring(name.length-7, name.length) 
    const students = useSelector(state => state.post.students)
    const myGroup = students.filter(el=>el.groupname===name)
    const withOutTeach = myGroup.filter(el=>el.name!==name)
    const engresult = useSelector(state => state.post.engresult)
    let friends =[]
   if(students.find(el=>el.name===name)!==undefined){
     friends=students.find(el=>el.name===name).friends
   }
    const likeposts = useSelector(state => state.post.likepost) 
    const newlikeMyPost = likeposts.filter(el=>el.author===name)
   const comments= useSelector(state => state.post.comments)
  let newCom =[]
  let ifriend =[] //у кого я в др
        comments.forEach(el=>{
    if(el.towhome[0].towhome===name && el.towhome[0].new==="yes"){
      if(el.towhome[0].towhome!==el.author[0].author){
      newCom.push(el)
      }
    }
      if(el.author[0].author===name && el.author[0].new==="yes"){
        if(el.name!==name){
          newCom.push(el)
        }
       }
    return el
  })

  const withOutmyLike = newlikeMyPost.filter(el=>{
    if(el.name===el.author){//если сам себе поставил лайк
      return false 
    }
    return el
  })

withOutmyLike.forEach(el=>{
    if(el.new=="yes"){
      newCom.push(el)
    }
  })

/*useEffect(()=>{
  console.log('сраб каждый раз')
})*/

  useEffect(() => {//сработает один раз при инициализ компонента
    loadAsync()
     },[])


  const getData = async () => { //куки для учителя
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value===null || value==="0"){
        setModal(true)
      }else{
        setModal(false)
      }
      
      setName(value)
      console.log("cookk",value)
  
    } catch(e) {
      // error reading value
    }
  }

  const loadAsync =async()=>{
    await getData()
    await loadsTeachers()(dispatch)
    await loadThemes()(dispatch)
    await loadPupils()(dispatch)
    await loadMessage()(dispatch)
    await loadsComments()(dispatch)
    await loadsConf()(dispatch)
    await loadMarks()(dispatch)
    await loadsConfPerson()(dispatch)
    await loadsGallery()(dispatch)
    await loadDropList()(dispatch)
    await loadDropAnswer()(dispatch)
    await loadLikePost()(dispatch)
    await loadsHistory()(dispatch)
    await loadEnglishTask()(dispatch)
    await loadEnglishResult()(dispatch)
    await loadTest()(dispatch)
   }


   const usersWithMe = useSelector(state => state.post.students)
   const me =usersWithMe.find(el=>el.name===name)
    const dispatch =useDispatch()

    usersWithMe.forEach(el=>{ //у кого я в друзьях
      if(el.name!==name){
      el.friends.forEach(elem=>{
        if(elem.name===name){
          ifriend.push(el)
        }
      })
    }
    })
  
    usersWithMe.forEach(el=>{ //убирает пометку новые для отсыла на бд
      if(el.name!==name){
      el.friends.map(elem=>{
        if(elem.name==name && elem.new==="yes"){
          newCom.push(elem)
        }
      })
    }
    })
  
    /*let newOldFriends = usersWithMe.map((elem,index)=>{ //делаем новые id по порядку,тк эти данные мы засовываем сразу в редакс,нам нужно чтобы id в редакс совпадали с id в бд
      elem.id = index+1
      return elem
    })*/
///////////////////////////////////////////////////////////////////////////////////
    /*const changeDatas = (data)=>{
      setData(data)
    }
    const changeMass =(data)=>{
      setTestmass(prev=>[...prev,{...data}])
    }

    useEffect(()=>{
      navigation.setParams({change:changeDatas})
    },[])
    useEffect(()=>{
      navigation.setParams({changemass:changeMass})
    },[])
/////проверяли на работоспособность кнопки в шапке профиля
    useEffect(() => {
      navigation.setParams({ data:data })
    }, [data])*/
////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(()=>{
      newBadge({name:name})(dispatch) //пихаем имя,чтобы исп его в других компоненетах,напр там,куда мы его не можем передать с помощ навигации
     // console.log("UUUUUUUUUUUUUUUUU")
    },[name])

    useEffect(()=>{
      if(withOutTeach.length!==0){
        setDisable(false)
     }else{
       setDisable(true)
     }
    },[withOutTeach])

  
const addTheme =()=>{
  navigation.navigate('Create',{name:name})
 }

const editProf =()=>{
    let aboutMe =usersWithMe.find(el=>el.name===name)
    console.log(aboutMe)
    navigation.navigate('Edit',{data:aboutMe})
  }



  const removeConf =async()=>{
    await DB.readConf()
    console.log("remove")
  }

  const deleteAllMess =async()=>{
    await DB.deleteAllMess()
  }

  const goToNews =()=>{


    let newCommments = comments.map(el=>{
      if(el.towhome[0].towhome===name && el.towhome[0].new==="yes"){
        el.towhome[0].new="no"
      }
        if(el.author[0].author===name && el.author[0].new==="yes"){
         el.author[0].new="no"
         }
      return el
    })
    
    newCommments = newCommments.map((elem,index)=>{ //делаем новые id по порядку,тк эти данные мы засовываем сразу в редакс,нам нужно чтобы id в редакс совпадали с id в бд
      elem.id = index+1
      return elem
    })

    usersWithMe.forEach(el=>{ //убирает пометку новые для отсыла на бд
      if(el.name!==name){
      el.friends.map(elem=>{
        if(elem.name==name && elem.new==="yes"){
          elem.new="no"   
        }
      })
    }
    })
  
    let newOldFriends = usersWithMe.map((elem,index)=>{ //делаем новые id по порядку,тк эти данные мы засовываем сразу в редакс,нам нужно чтобы id в редакс совпадали с id в бд
      elem.id = index+1
      return elem
    })

    oldFriend(newOldFriends)(dispatch)
    readsComment(newCommments)(dispatch)
    oldlikePost(name)(dispatch)
    navigation.navigate('News',{name:name})
  }
 
  const personList =(myname,name)=>{
    const find = myname.substring(myname.length-7, myname.length) 
    if(myname===name){
     if(find==="Teacher"){
      navigation.navigate('Admin',{name:myname})
    }else{
     navigation.navigate('Student',{name:myname})
    }
    }else{
     navigation.navigate('Person',{myname:myname,name:name})
    }
   } 

   const getp = async()=>{
    const data = await DB.getPupils()
    console.log("SSSSSS",data)
   }

   const removeFromFriend =(elname,myfriends)=>{ //убирает меня у других пользователей из друзей
    const removeinfo = {myname:elname,myfriends:myfriends.filter(el=>el.name!==name)}
     removeFriend(removeinfo)(dispatch)
   }

   const goOut=async()=>{
    await AsyncStorage.setItem('@storage_Key', "0")
    setName("0")
    setModal(true)
   }

   const onChangeCook =(cook)=>{
     setName(cook)
   }

   if(name===null || name==="0"){
    return(
      <ModalLogin visible={modal} onChangeCook={onChangeCook} onCancel={()=>setModal(false)}/>
    )
  }
   else if(loading || loadinglike || loadingcomment || name===""){
    return(
      <View style={styles.center}>
       <ActivityIndicator size={70} color="hotpink"/>
      </View>
    )
  } 
  else if(findname!=="Teacher"){
     return(<ScrollView padding={20}>
      <View style={styles.block}>
        <Text style={styles.text}>Кабинет ученика</Text>
        <IconBadge info={newCom} goToNews={goToNews}/>
        </View>  
        <View style={styles.block}>
          {<Image style={styles.imagep} source={{uri:me.image}}/>}
          <Text style={styles.text}>Здравствуйте,{name}!</Text>
        </View>
        <Button title="Главный экран" padding={10} color="crimson" onPress={()=>navigation.navigate('Mainnav',{name:name,visible:false})}/>
        <Button title="Редактировать профиль" color="palevioletred" onPress={editProf}/> 
        <Button title="Перейти к заданиям" color="plum" onPress={()=>{navigation.navigate('Drop',{name:name})}}/>   
        <Button title="Результаты теста" color="palevioletred" onPress={()=>{navigation.navigate('Result',{name:name})}}/>
        <Button title="Понравилось" color="lightpink" onPress={()=>{navigation.navigate('Like',{name:name})}}/>
        <Text style={styles.text}>Мои друзья:</Text>
        <View style={styles.block} marginBottom={10}>
        {friends.map(el=><View key={el.id}>
         <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
           <Image style={styles.imagepp} source={{uri:usersWithMe.find(elem=>elem.name===el.name).image}}/>
           <Text>{el.name}</Text>
          </TouchableOpacity>
        </View>)}
        </View>
        {ifriend.length>0 ?
          <Text style={styles.text}>Вы в друзьях у:</Text>:
          null
          }
        <View style={styles.block}> 
        {ifriend.map(el=><View key={el.id} marginRight={15}>
         <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
           <Image style={styles.imagepp} source={{uri:el.image}}/>
           <Text>{el.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>removeFromFriend(el.name,el.friends)}>
            <Text style={styles.texterror}>Удалить</Text>
          </TouchableOpacity>
        </View>)
        }
        </View> 
        {/*<ModalLogin visible={modal} onChangeCook={onChangeCook} onCancel={()=>setModal(false)}/>*/}
        <Button title="Выйти" color="black" onPress={()=>goOut()}/>
      </ScrollView>)
   }else {return(
        <ScrollView paddingHorizontal={10}>
          {/*testmass.map(el=><Text key={el.id}>{el.data}</Text>)*/}
          {/*students.map(el=><Text key={el.id}>{el.name}</Text>)*/}
          {/*<Button title="getp" onPress={getp}/>*/}
          <View style={styles.block} paddingVertical={10}>
            <Text style={styles.text}>Админ панель</Text>
            <IconBadge info={newCom} goToNews={goToNews}/>
            </View>
            <View style={styles.block}>
            {<Image style={styles.imagep} source={{uri:me.image}}/>}
            <Text style={styles.text}>Здравствуйте,{name}!</Text>
            </View>
            {friends.length > 0 ?
            <Text style={styles.text}>Мои друзья</Text>:
            null
             }
            <View style={styles.block}>
            {friends.map(el=><View key={el.id}>
             <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
               <Image style={styles.imagepp} source={{uri:students.find(elem=>elem.name===el.name).image}}/>
               <Text>{el.name}</Text>
              </TouchableOpacity>
            </View>)}
             </View>
            <Button title="Добавить учеников" color="black" onPress={()=>navigation.navigate('Pupillist',{visible:true,name:name,goout:goOut})}/> 
            <Button title="Главный экран" padding={10} disabled={disable} color="crimson" onPress={()=>navigation.navigate('Mainnav',{name:name,visible:true})}/>
            <Button title="Создать новую тему" padding={10} color="lightpink" onPress={addTheme}/>
            <Button title="Создать тест" padding={10} color="plum" onPress={()=>navigation.navigate('Createtest',{name:name})}/>
            <Button title="Создать drop" color="hotpink" onPress={()=>{navigation.navigate('Dropcreate',{name:name})}}/>
            <Button title="Ответы на задание" disabled={disable} color="palevioletred" onPress={()=>{navigation.navigate('Dropanswer',{name:name})}}/>
            <Button title="Итоги олимпиад" disabled={disable} padding={10} color="indianred" onPress={()=>{navigation.navigate('Marks')}}/>
            <Button title="Редактировать профиль" color="lightcoral" onPress={editProf}/>
            <Button title="Удалить конференцию" color="lightpink" onPress={removeConf}/>
            <Button title="удалить все сообщения" color="lightcoral" onPress={()=>deleteAllMess}/> 
            <Button title="рабочий экран" color="black" onPress={()=>{navigation.navigate('Work')}}/> 
            <Button title="Результаты теста" disabled={disable} color="palevioletred" onPress={()=>{navigation.navigate('Result',{name:name})}}/>
            <Button title="Понравилось" disabled={disable} color="lightpink" onPress={()=>{navigation.navigate('Like',{name:name})}}/>
            <Button title="Результаты по городу" disabled={disable} color="hotpink" onPress={()=>{navigation.navigate('Region',{name:name})}}/>
            <Button title="Создать историю" disabled={disable} color="pink" onPress={()=>{navigation.navigate('Createhistory',{name:name})}}/> 
            <Button title="Histories" disabled={disable} color="black" onPress={()=>{navigation.navigate('Histories',{name:name})}}/> 
            <Button title="Create English" disabled={disable} color="plum" onPress={()=>{navigation.navigate('Createeng',{name:name})}}/> 
            <Button title="EnglishList" disabled={disable} color="crimson" onPress={()=>{navigation.navigate('Englist',{name:name})}}/>
            <Button title="EnglishResult" disabled={disable} color="crimson" onPress={()=>console.log(engresult)}/> 
            {ifriend.length>0 ?
              <Text style={styles.text}>Вы в друзьях у:</Text>:
              null
            }
            <View style={styles.block}> 
            {ifriend.map(el=><View key={el.id} marginRight={15}>
             <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
               <Image style={styles.imagepp} source={{uri:el.image}}/>
               <Text>{el.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>removeFromFriend(el.name,el.friends)}>
                <Text style={styles.texterror}>Удалить</Text>
              </TouchableOpacity>
            </View>)
            }
            </View>
            {/*<ModalLogin visible={modal} onChangeCook={onChangeCook} onCancel={()=>setModal(false)}/>*/}
            <Button title="Выйти" color="black" onPress={()=>goOut()}/>
        </ScrollView>
    )
          }    
}

AdminScreen.navigationOptions = ({ navigation }) => { //проверяли на работоспособность кнопки в шапке профиля
 /* const data = navigation.getParam('data')
   const change = navigation.getParam('change')
   const changemass = navigation.getParam('changemass')
   //const toggleHandler = navigation.getParam('toggleHandler')
   //const iconName = booked ? 'ios-star' : 'ios-star-outline'
   let mass = {id:Date.now(),data:data}
   return {
     headerTitle: 'Пост',
     headerRight:() => (
       <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
         <Item title='Take photo' iconName={'ios-star'} onPress={()=>change("head")} />
       </HeaderButtons>
     ),
     headerRight:()=>(
       <>
      <TextInput
      placeholder="Введите пароль"
      value={data}
      onChangeText={(data)=>change(data)}
      />
      <Button title="touch" onPress={()=>changemass(mass)}/>
      </>
     )
   }*/
 }


const styles = StyleSheet.create({
    imagep: {
      width: 70,
      height: 70,
      margin: 15,
      borderRadius:50
    },
    imagepp: {
      width: 50,
      height: 50,
      borderRadius:50,
      margin:5
    },
    img:{
      width: 50,
      height: 50,
      margin:5
    },
    text:{
      fontFamily:'open-bold'
    },
    block:{
      flexDirection:"row",
      alignItems:"center"
    },
    texterror:{
      fontFamily:'open-bold',
      color:"red"
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
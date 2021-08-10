import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet, Button, View, Image,Alert,TextInput,TouchableOpacity,Platform,TouchableNativeFeedback} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addComments, addLikePost, delComment, dislikePost, editNoteOfGallery, removeNoteOfGallery } from '../store/actions/post'
import { ModalMes } from '../components/ModalMes'
import {AntDesign} from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Icon } from 'react-native-elements'

export const ImageScreen = ({navigation}) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
    const data= navigation.getParam('data')
    const navName= navigation.getParam('name')
    const name=data.name
    const likepost = useSelector(state => state.post.likepost)
    const personlike = likepost.filter(el=>el.idpost===data.id)
    const likepostme = likepost.find(el=>el.idpost===data.id && el.name===navName)
    const [modaldirect,setModaldirect]=useState(false)
    const [redirect,setRedirect] = useState(null)
    const [visible,setVisible]=useState(true)
    const [unvisible,setUnvisible]=useState(false)
    const [comment,setComment]=useState(data.comment)
    const [answer,setAnswer]=useState(null)//ответ на комментарий
    const [cancel,setCancel]=useState(false)
    const [edit,setEdit]=useState(true)
    const [text,setText]=useState('')
    const [heart,setHeart]=useState('hearto')
    const dispatch = useDispatch()
    const usersWithMe= useSelector(state => state.post.students)
    const me =usersWithMe.find(el=>el.name===name)
    const loadcomments = useSelector(state => state.post.comments)
    const comments = loadcomments.filter(el=>el.idpost===data.id)

    useEffect(()=>{
  if(name!==navName){
      setEdit(false)
  }
    },[])

useEffect(()=>{
   if(likepostme!==undefined){
       setHeart(likepostme.like)
   }else{
       setHeart('hearto')
   }
},[likepostme])

    const editNote =()=>{
       setVisible(false)
       setUnvisible(true)
    }

    const saveNote =()=>{
        const info ={id:data.id,comment:comment}
        editNoteOfGallery(info)(dispatch)
        setVisible(true)
        setUnvisible(false)
       Alert.alert('Изменения сохранены')
    }
 
    if(!data){
        return null
    }
    
    const delNote =()=>{
     removeNoteOfGallery(data.id)(dispatch)
     navigation.navigate('Gallery')
    }

    const addComment =()=>{
        const info ={name:navName, comment:text, idpost:data.id, towhome:[{towhome:answer,new:"yes"}], author:[{author:name,new:"yes"}]}
        console.log(info)
        addComments(info)(dispatch)
        setText('')
        setAnswer(null)
        setCancel(false)
    }

    const removeComment =(id)=>{
     let findComment = comments.find(el=>el.id===id && el.name===navName)
    if(findComment){
        delComment(id)(dispatch)
     } 
    }

    const answertoComment =(name)=>{
        if(name!==navName){ //чтобы чел не мог сам себе отвечать на коммент
        setText(`${name},`)
        setAnswer(name)
        setCancel(true)
        }
        else{
            return false
        }
    }

    const toCancel =()=>{
        setText('')
        setAnswer(null)
        setCancel(false)  
    }

    const sharePost =()=>{
        setRedirect([{...data}])
        setModaldirect(true)
    }

   
    
    const cancelModal =()=>{
      setRedirect([])
      setModaldirect(false)
    }
    
    
    const onOpen =(username)=>{
      navigation.navigate('Message',{name:username,myname:navName,redirectpost:redirect})
      setModaldirect(false)
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
      
    const giveLike =()=>{
       let info = {name:navName,like:'heart',idpost:data.id,author:name,new:'yes'}
        if(heart==="heart"){
            dislikePost(likepostme.id)(dispatch) 
        }else{
           addLikePost(info)(dispatch)
        }
    }

return(
    <ScrollView>
        <View padding={10}>
        <View style={styles.block}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>personList(navName,name)}>
                <Image style={styles.imagep} source={{uri:me.image}}/>
            </TouchableOpacity>   
            <Text style={styles.text}>{name}</Text>
        </View>
       <Image style={styles.image} source={{uri:data.image}}/>
         {visible&&<Text style={styles.com}>"{comment}"</Text>}
         <View style={styles.block1}>
        <Wrapper onPress={giveLike}>
         <AntDesign name={heart} size={28} color="#c71269"/>
         </Wrapper>    
        {edit&&visible&&<Wrapper onPress={editNote}>
         <MaterialCommunityIcons name="playlist-edit" size={45} color="#c71269"/>
         </Wrapper>}
        {edit&&<Wrapper onPress={delNote}>
         <MaterialCommunityIcons name="playlist-remove" size={45} color="#c71269"/>
         </Wrapper>}
        <Wrapper onPress={sharePost}>
         <Feather name="send" size={30} color="#c71269"/>
         </Wrapper>
         </View>
        <View>
            <Text style={styles.like}>Нравится: {personlike.length}</Text>
            {personlike.map(el=>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>personList(navName,el.name)}>
            <Text style={styles.like} key={el.id}>{el.name}</Text>
            </TouchableOpacity>    
            )}
        </View>
         <ModalMes visible={modaldirect} name={navName} onOpen={onOpen} onCancel={cancelModal}/>
         {unvisible&&<TextInput style={styles.input} value={comment} multiline onChangeText={setComment}/>}
        {unvisible&&<Button title="Сохранить" style={styles.button} color="#48D1CC" onPress={saveNote}/>} 
        <View style={styles.comblock}>
        <View>
            <Text style={styles.name}>Комментарии пользователей:</Text>
            {comments.map(elem=><TouchableOpacity activeOpacity={0.7} key={elem.id} onLongPress={()=>removeComment(elem.id)} onPress={()=>answertoComment(elem.name)}>
                <View>
                <Text style={styles.name}>{elem.name}:</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>personList(navName,elem.name)}>
                <Image style={styles.imagecom} source={{uri:usersWithMe.find(el=>el.name===elem.name).image}}/>
                </TouchableOpacity>
                <Text>{elem.comment}</Text>
            </View>
            </TouchableOpacity>)}
        </View>
        <View>
            <View style={styles.block}>
            <TextInput placeholder="Оставьте комментарий..." width={300} value={text} multiline onChangeText={setText}/>
            <Icon name='sc-telegram' type='evilicon' size={50} onPress={addComment} color="#BC8F8F"/>
            </View>
            {cancel&&<Button title="Отмена" onPress={toCancel}/>}
        </View>
        </View> 
        </View>
    </ScrollView>
)
}
const styles = StyleSheet.create({
    container:{
        //margin:10
    },
    image: {
      width: '100%',
      height: 400,
      marginTop: 20
    },
    text:{
        fontFamily:'open-bold',
        fontSize:20,
        padding:10
    },
    input:{
        //borderBottomColor: "#48D1CC",
       //borderWidth: 9,
        padding:10
    },
    com:{
        fontSize:15,
        padding:10 
    },
    imagep: {
        width: 70,
        height: 70,
        marginTop: 10,
        borderRadius:50
      },
      imagecom: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius:30
      },
      name:{
        fontFamily:'open-bold'
      },
      comblock:{
        padding:10
      },
      like:{
         fontFamily: "open-bold"
      },
      block:{
        flexDirection:"row",
        alignItems:"center"
      },
      block1:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
      }
  })
  
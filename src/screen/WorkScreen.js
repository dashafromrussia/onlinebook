import React, { useState, useEffect,useCallback } from 'react';
import { Platform, Text, View, StyleSheet,TouchableHighlight,TouchableOpacity,Button,Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import { StorageAccessFramework } from 'expo-file-system';
//import * as RNFS from 'react-native-fs';
import { useDispatch,useSelector } from 'react-redux'
//import ListViewSelect from 'react-native-list-view-select'
import MapView from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import  {AppHeaderIcon} from '../components/AppHeaderIcon'

export const WorkScreen = ({navigation}) => { 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
   const [color1,setColor1] = useState('red')
   const [color2,setColor2] = useState('blue')
   const [marki,setMarki] = useState([])
   const [data,setData] = useState('no')
   const [nav,setNav] =useState('aaaa')
   const [datas,setDatas] = useState('city')
   const [mass,setMass] = useState([{title:"city",color:"red"},{title:"olimp",color:"blue"},
   {title:"group",color:"blue"}])
   let marks = useSelector(state => state.post.marks)

   useEffect(()=>{
     if(datas==="city"){ //табы..еще табы в регионскреен
       setMarki(marks.filter(el=>el.city==="Yoshkar-Ola"))
     }else if(datas==="olimp"){
      setMarki(marks.filter(el=>el.olimp==="yes"))
     }else{
      setMarki(marks.filter(el=>el.groupname==="Teacher"))
     }
   },[datas])


   const toggleHandler = useCallback(() => {
       setNav("000")
       console.log(nav)
  }, [])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])


   useEffect(()=>{
    navigation.setParams({ nav:<Button title="aaa" onPress={()=>console.log(aaaa)}/>})
   })

 /* useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.LOCATION
      )
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return 
      }

      let location = await Location.getCurrentPositionAsync({});
     setLocation(location);
     console.log("lattttttt",location.coords.latitude)
     const resp =  await fetch(`http://whatsthere.maps.sputnik.ru/point?lat=${location.coords.latitude}&lon=${location.coords.longitude}&apikey="5032f91e8da6431d8605-f9c0c9a00357"`)
     const data = await resp.json()
      console.log("address",data.result.address[0].features[0].properties.title)
    })();
  }, []);
//http://site.ru/page.php?name=dima&age=27
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }*/



const changeData =(datas)=>{
  setData("yes")
  setDatas(datas)
 // marks = marks.filter(el=>el.olimp===data) //так не срабатыв..а когда фильтруешь в jsx то сработает..лучше засунунть в стейт марки,как мы это и сделали..см эффект
  let items = mass.map(el=>{
    if(el.title===datas){
      el.color = "red"
    }else{
      el.color = "blue"
    }
    return el
  })
  setMass(items)
}

const load = async()=>{ //пыталась прочитать путь до файла,чтобы потом проч файл..не работает хз
 /*const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync('OBapp.pdf');

if (permissions.granted) {
  // Gets SAF URI from response
  const uri = permissions.directoryUri;

  // Gets all files inside of selected directory
  const files = await StorageAccessFramework.readDirectoryAsync(uri);
  console.log(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
}*/
/*RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result);

    // stat the first file
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }

    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });*/
}


  return (
    <View>
      <Button title="load" onPress={load}/>
       <View flexDirection="row" justifyContent="space-around">
         {mass.map(el=><View key={el.title} width={150}><Button key={el.title} title={el.title} color={el.color} onPress={()=>changeData(el.title)}/></View>)}
      </View>
      <Text>{data}</Text>
      <Text>{datas}</Text>
      {marks.map(el=><Text key={el.id}>{el.name}</Text>)}
      {marki.length==0 ? <Text>load...</Text>:
      marki.map(el=><Text key={el.id}>markii:{el.name}</Text>)}
      {/*marks.filter(elem=>elem.olimp===data).map(el=><Text key={el.id}>{el.name}</Text>) это будет изм в зависимости от стейта дата*/}
      {/*data==="region" ? <Text>about region</Text>:<Text>about olimp</Text>*/}
    </View>
  );
}

WorkScreen.navigationOptions = ({ navigation }) => {//не раб..в др работает
  /* const date = navigation.getParam('date')
   const booked = navigation.getParam('booked')
   const toggleHandler = navigation.getParam('toggleHandler')
   const iconName = booked ? 'ios-star' : 'ios-star-outline'*/
   return {
     headerTitle: 'Пост',
     headerRight:() => (
       <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
         <Item title='Take photo' iconName={'ios-star'} onPress={()=>console.log("a")} />
       </HeaderButtons>
     )
   }
 }

/*import React, {useState,useEffect} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
// Import Image Picker
 //import ImagePicker from 'react-native-image-picker';
 import * as ImagePicker from 'react-native-image-picker'
import { Works } from '../components/Works';
import { workWork } from '../store/actions/post';
import { TextInput } from 'react-native-gesture-handler';


export const WorkScreen = () => { //тестовый экран, данные не имеют с приложением ничего общего
  const [mess,setMess] = useState('')
  const [pechat,setPechat] = useState('')
  const works = useSelector(state => state.post.works)
  //const dispatch = useDispatch() 
  useEffect(()=>{
    console.log(works)
  },[])


  /*const [filePath, setFilePath] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      ImagePicker.launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };*/
  /*const changess =(text)=>{
    setMess(text)
    //setPechat('Печатает....')
    console.log("pp",pechat)
    return(
      setPechat('Печатает...')
    )
  }*/

 /* {return (
    //<View>
    //  {/*works.map(el=>
       // {<Works key={el.id} data={el}/>
    //  )*/
      //{/*<TextInput placeholder="write smth......" value={mess} onChangeText={(text)=>{changess(text)}}/>
      /*<Text>{pechat}</Text>
      <Button title="send" onPress={()=>setPechat('')}/>
  </View>*/
    /*<SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> 
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>
            Launch Camera for Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>*/
 // );
//};*/


/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});*/


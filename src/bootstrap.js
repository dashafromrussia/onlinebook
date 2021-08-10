import * as Font from 'expo-font'
import { DB } from './db'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendCookie } from './store/actions/post';
import { useDispatch, useSelector } from 'react-redux'
export async function bootstrap() {
 
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf')
    })
    await DB.init()
    console.log('Database started...')

    await DB.init1()
    console.log('Database started1...')

    await DB.init2()
    console.log("Pupils started...")

    await DB.init3()
    console.log("Tests started...")

    await DB.init4()
    console.log("Messages started...")

    await DB.init5()
    console.log("Themes started....")

    await DB.init7()
    console.log("Gallery started....")

    await DB.init8()
    console.log("Comments started....")

    await DB.init9()
    console.log("Conference started....")

    await DB.init10()
    console.log("Hidden started....")

    await DB.init11()
    console.log("Marks started....")

    await DB.init12()
    console.log("Confperson started....")

    await DB.init13()
    console.log("Droplist started....")

    await DB.init14()
    console.log("Dropanswer started....")

    await DB.init15()
    console.log("likegallery started....")

    await DB.init16()
    console.log("teachers started....")

    await DB.init17()
    console.log("histories started....")

    await DB.init18()
    console.log("englishtasks started....")

    await DB.init19()
    console.log("englishresults started....")
 
    /*const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      console.log("cookie",value)
    }*/

  } catch (e) {
    console.log('Error: ', e)
  }
}

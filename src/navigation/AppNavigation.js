import React from 'react'
import {createAppContainer} from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { CreateScreen } from '../screen/CreateScreen'
import { LoginScreen } from '../screen/LoginScreen'
import { MainScreen } from '../screen/MainScreen'
import { PageScreen } from '../screen/PageScreen'
import { UpdateScreen } from '../screen/UpdateScreen'
import { CreateTest } from '../screen/CreateTest'
import { AllTest } from '../screen/AllTest'
import { TestScreen } from '../screen/TestScreen'
import { AdminScreen } from '../screen/AdminScreen'
import { StudentScreen } from '../screen/StudentScreen'
import { MessageScreen } from '../screen/MessageScreen'
import { PupilListScreen } from '../screen/PupilsListScreen'
import { EditProfilScreen } from '../screen/EditProfilScreen'
import { GaleryScreen } from '../screen/GaleryScreen'
import { ImageScreen } from '../screen/ImageScreen'
import { ConferenceScreen } from '../screen/ConferenceScreen'
import { TestMarksScreen } from '../screen/TestMarksScreen'
import { ConfpersonScreen } from '../screen/ConfpersonScreen'
import { PersonScreen } from '../screen/PersonScreen'
import { ChatScreen } from '../screen/ChatScreen'
import { CreateDropScreen } from '../screen/CreateDropScreen'
import { DropScreen } from '../screen/DropScreen'
import { DropAnswerScreen } from '../screen/DropAnswerScreen'
import { Ionicons } from '@expo/vector-icons'
import { BadgeComponent } from '../components/BadgeComponent'
import { ConfBadge } from '../components/ConfBadge'
import { NewsScreen } from '../screen/NewsScreen'
import { WorkScreen } from '../screen/WorkScreen'
import { TestResultScreen } from '../screen/TestResultScreen'
import { UpdateTestScreen } from '../screen/UpdateTestScreen'
import { LikeScreen } from '../screen/LikeScreen'
import { RegionResultScreen } from '../screen/RegionResultScreen'
import { CreateHistoryScreen } from '../screen/CreateHistoryScreen'
import { HistoryScreen } from '../screen/HistoryScreen'
import { HistoryList } from '../screen/HistoryList'
import { EnglishScreen } from '../screen/EnglishScreen'
import { CreateEnglishScreen } from '../screen/СreateEnglishScreen'
import { EnglishList } from '../screen/EnglishList'

const navigatorOptions = {
  defaultNavigationOptions: {
    
    /*headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR*/
  }
}
/*const ChatNavigator = createStackNavigator(
  {
    Chat: ChatScreen,
    Message:MessageScreen
  },
  navigatorOptions
)


const ThemeNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Page:PageScreen,
  },
  navigatorOptions
)

const TestNavigator = createStackNavigator(
  {
    Alltest:AllTest,
   Test:TestScreen
  },
  navigatorOptions
)

const GalleryNavigator = createStackNavigator(
  {
    Gallery: GaleryScreen,
   Photo: ImageScreen,
  },
  navigatorOptions
)*/
/*tabBarIcon : ( {  tintColor  } )  =>  ( 
  < View  style = { {  marginTop : 20  } } > 
    < Icon  name = "camera"  size = { 25 }  color = { tintColor } / > 
  < / View > */

const bottomTabsConfig = {
  Main: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Тема',
      tabBarIcon: info => (
        <Ionicons name='ios-albums' size={25} color={info.tintColor} />
      )
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      tabBarLabel: 'Чаты',
      tabBarIcon: info => (
        <BadgeComponent info={info}/>
      ),
    }
  },
  Gallery: {
    screen: GaleryScreen,
    navigationOptions: {
      tabBarLabel: 'Галерея',
      tabBarIcon: info => (
        <Ionicons name='ios-images' size={25} color={info.tintColor} />
      )
    }
  },
  Alltest: {
    screen: AllTest,
    navigationOptions: {
      tabBarLabel: 'Тесты',
      tabBarIcon: info => (
        <Ionicons name='ios-build' size={25} color={info.tintColor} />
      )
    }
  },
  Conference: {
    screen: ConferenceScreen,
    navigationOptions: {
      tabBarLabel: 'Беседа',
      tabBarIcon: info => (
        <ConfBadge info={info}/>
      )
    }
  }
}

const BottomNavigator = createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
          activeTintColor: "black"
        }
      })



const LoginNavigator = createStackNavigator(
    {
   // Login: LoginScreen, //по умолч грузится первый экран,но если указ initialRouteName...то
   //Student: StudentScreen,
    Admin: AdminScreen,
    Pupillist:{
      screen: PupilListScreen},
    Create:{
      screen: CreateScreen
    },
   Mainnav: {
     screen:BottomNavigator,
    },
   Confperson: ConfpersonScreen,
   News: NewsScreen,
   Marks: TestMarksScreen,
   Page: PageScreen,
   Update: UpdateScreen,
   Createtest: CreateTest,
  // Alltest:AllTest,
   Test:TestScreen,
   Message:MessageScreen,
   Edit: EditProfilScreen,
  // Gallery: GaleryScreen,
   Photo: ImageScreen,
  // Conference: ConferenceScreen,
   Person: PersonScreen,
   //Chat: ChatScreen,
   Dropcreate: CreateDropScreen,
   Drop: DropScreen,
   Dropanswer: DropAnswerScreen,
   Work: WorkScreen,
   Result: TestResultScreen,
   Updatetest: UpdateTestScreen,
   Like: LikeScreen,
   Region:RegionResultScreen,
   Createhistory: CreateHistoryScreen,
   History: HistoryScreen,
   Histories: HistoryList,
   English:EnglishScreen,
   Createeng:CreateEnglishScreen,
   Englist:EnglishList
},
{
  initialRouteName: 'Admin', //по умолч сначала будет грузиться главн экран
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: "hotpink"//стили для хедеров всех компонентов
    },
    headerTintColor: '#fff' //цвет заголовка для всех*/
    /*headerMode: 'none',
    header: null*/
  }
})



export const AppNavigation = createAppContainer(LoginNavigator)



/*const MainNavigator = createDrawerNavigator(
  {
   Theme: {
      screen:MainScreen,
      navigationOptions: {
        drawerLabel: 'Список тем'
        // drawerIcon: <Ionicons name='ios-star' />
      }
    },
    AllTest: {
      screen: AllTest,
      navigationOptions: {
        drawerLabel: 'Тесты'
      }
    },
    Gallery: {
      screen: GaleryScreen,
      navigationOptions: {
        drawerLabel: 'Галерея'
      }
    },
    Drop: {
      screen: DropScreen,
      navigationOptions: {
        drawerLabel: 'К заданиям'
      }
    },
  },
  {
    defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: 'pink'//стили для хедеров всех компонентов
    },
    headerTintColor: '#fff', //цвет заголовка для всех*/
    /*headerMode: 'none',
    header: null*/
  /*},
    contentOptions: {
      headerIcon: <Ionicons name='ios-star'/>,
      activeTintColor: 'hotpink',
      labelStyle: {
        fontFamily: 'open-bold'
      }
    }
  }
)*/



/* const LoginNavigator = createStackNavigator(
    {
    Login: LoginScreen, //по умолч грузится первый экран,но если указ initialRouteName...то
   Student: StudentScreen,
    Admin: AdminScreen,
    Pupillist: PupilListScreen,
    Create:{
      screen: CreateScreen
    },
   Main: MainScreen,
   Confperson: ConfpersonScreen,
   Marks: TestMarksScreen,
   Page: PageScreen,
   Update: UpdateScreen,
   Createtest: CreateTest,
   Alltest:AllTest,
   Test:TestScreen,
   Message:MessageScreen,
   Edit: EditProfilScreen,
   Gallery: GaleryScreen,
   Photo: ImageScreen,
   Conference: ConferenceScreen,
   Person: PersonScreen,
   Chat: ChatScreen,
   Dropcreate: CreateDropScreen,
   Drop: DropScreen,
   Dropanswer: DropAnswerScreen
},
{
  initialRouteName: 'Login', //по умолч сначала будет грузиться главн экран
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: 'pink'//стили для хедеров всех компонентов
    },
    headerTintColor: '#fff' //цвет заголовка для всех
  }
})

export const AppNavigation = createAppContainer(LoginNavigator)*/
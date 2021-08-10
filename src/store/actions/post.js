//import * as FileSystem from 'expo-file-system'
import { ADD_POST, REMOVE_POST, UPDATE_POST, UPDATE_THEME,REMOVE_BLOCK, ADD_TEST, DELETE_PHOTO,DELETE_TEST, ADD_MESSAGE,REMOVE_MESSAGE, LOAD_PUPILS, ADD_PUPIL, EDIT_PROFIL,LOAD_TEST, LOAD_MESSAGE, LOAD_THEME, ADD_GALLERY, LOAD_GALLERY, REMOVE_NOTE, EDIT_NOTE, LOAD_COMMENTS, ADD_COMMENTS, LOAD_CONF, ADD_MESSCONF, REMOVE_MESSCONF, DELETE_COMMENT, READ_MESSAGE, READ_CONF, SEND_TEST, LOAD_MARKS, LOAD_CONFPERSON, ADD_CONFPERSON, VISIBLE_CONFPERSON, LOAD_DROP, ADD_DROP, DELETE_DROP, VISIBLE_DROP, UPDATE_DROP, LOAD_DROPANSWER, ADD_DROPANSWER, MARK_DROP, LOAD_LIKE, LIKE_POST, DISLIKE_POST, NEW_BADGE, EDIT_BADGE, NEWCONF_BADGE, EDITCONF_BADGE, READ_COMMENT, OLD_LIKE, TEACHER_PASSWORD, UPDATETHEME_TEST, UPDATE_TEST, NEW_WORK, PECHAT_MESS, PECHAT_REMOVE, ADD_FRIEND, REMOVE_FRIEND, OLD_FRIEND, SEND_COOKIE, LOAD_TEACHERS, ADD_TEACHER, DELETE_PUPILS, TEST_REFRESH, ADD_HISTORY, LOAD_HISTORY, LOAD_ENGLISH, ADD_ENGLISH, ENG_REFRESH, ADD_ENGRESULT, LOAD_ENGRESULT } from '../types'
import { DB } from '../../db'

export const loadPupils = () => {
  return async dispatch => {
    const pupils = await DB.getPupils()
    dispatch({
      type: LOAD_PUPILS,
      payload: pupils
    })
  }
  
}

export const addPupil = (data) => {
  return async dispatch => {
    const pupil = await DB.addPupils(data)
    dispatch({
      type: ADD_PUPIL,
      payload:{id:pupil,...data}
    })
  } 
}



export const addPosts = (post) => {
  return async dispatch =>{
    let id =await DB.addTheme(post)
   dispatch({
        type: ADD_POST,
        payload:{...post,id:id}
    })
}
}

export const loadThemes=()=>{
  return async dispatch =>{
    const themes =await DB.getThemes()
 dispatch({
    type:LOAD_THEME,
    payload:themes
  })
}
}


export const updateTheme = (theme) => {
  return async dispatch =>{
    await DB.updateTheme(theme)
  dispatch({
      type: UPDATE_THEME,
      payload:theme
  })
}
}

export const updateInfo = (info) => {
 return async dispatch=>{
   await DB.upDateBlock(info)
  dispatch({
      type: UPDATE_POST,
      payload:info
  })
}
}

export const deleteTheme=(id)=>{
 return async dispatch =>{
   await DB.removeTheme(id)
  dispatch({
    type: REMOVE_POST,
    payload:id
  })
}
}

export const deleteBlock=(id)=>{
  return async dispatch =>{  
    await DB.deleteBlockOfTheme(id)
 dispatch({
    type: REMOVE_BLOCK,
    payload:id
  })
}
}

export const addTest=(tests)=>{
  return async dispatch =>{
    const test =await DB.addTest(tests)
 dispatch({
    type:ADD_TEST,
    payload:{id:test,...tests}
  })
}
}

export const loadTest=()=>{
  return async dispatch =>{
    const tests =await DB.getTest()
 dispatch({
    type:LOAD_TEST,
    payload:tests
  })
}
}



export const deletePhoto=(data)=>{
  return async dispatch =>{
    await DB.deletePhotoBlock(data)
  dispatch({
    type: DELETE_PHOTO,
    payload: data
  })
}
}

export const delTest=(id)=>{
return async dispatch =>{
  await DB.deleteTest(id)
 dispatch({
    type: DELETE_TEST,
    payload: id
  })
}
}

export const sendTest=(data)=>{
  return async dispatch =>{
   let id = await DB.sendMarkTest(data)
   dispatch({
      type: SEND_TEST,
      payload: {id:id,...data}
    })
  }
  }


  export const loadMarks=()=>{
    return async dispatch =>{
      const marks =await DB.loadMarks()
   dispatch({
      type:LOAD_MARKS,
      payload: marks
    })
  }
  }
  export const updateThemeTest=(data)=>{
    return async dispatch =>{
     await DB.updateThemeTest(data)
     dispatch({
        type: UPDATETHEME_TEST,
        payload: data
      })
    }
    }

    export const updateTests=(data)=>{
      return async dispatch =>{
       await DB.updateTest(data)
       dispatch({
          type: UPDATE_TEST,
          payload: data
        })
      }
      }  


    export const deleteQuest=(data)=>{
      return async dispatch =>{
        await DB.updateTest(data)
        dispatch({
            type: UPDATE_TEST,
            payload: data
          })
        }
        } 

/*export const addTest=(tests)=>{
  return async dispatch =>{
    const test =await DB.addTest(tests)
 dispatch({
    type:ADD_TEST,
    payload:tests
  })
}
}*/

export const loadDropList=()=>{
  return async dispatch =>{
   let droplist = await DB.loadsDrop()
  dispatch({
    type: LOAD_DROP,
    payload: droplist
  })
}
}

export const addDropList=(data)=>{
  return async dispatch =>{
    let insertId =await DB.addDrop(data)
  dispatch({
    type:ADD_DROP,
    payload:{...data,id:insertId}
  })
}
}

export const deleteDropList=(id)=>{
  return async dispatch =>{
    await DB.deleteDrop(id) 
  dispatch({
    type:DELETE_DROP,
    payload: id
  })
}
}

export const markDrop=(data)=>{
  return async dispatch =>{
    await DB.saveDropMark(data) 
  dispatch({
    type: MARK_DROP,
    payload: data
  })
}
}

export const changeVisibleDrop=(data)=>{
  return async dispatch =>{
    await DB.visibleDropBlock(data) 
  dispatch({
    type: VISIBLE_DROP,
    payload: data
  })
}
}


export const updateDrop=(data)=>{
  return async dispatch =>{
    await DB.updateDropBlock(data) 
  dispatch({
    type: UPDATE_DROP,
    payload: data
  })
}
}


export const loadLikePost=()=>{
  return async dispatch =>{
   let like = await DB.loadsLikePhoto()
  dispatch({
    type: LOAD_LIKE,
    payload: like
  })
}
}

export const addLikePost=(send)=>{
  return async dispatch =>{
    let insertId =await DB.addLikePhoto(send)
  dispatch({
    type:LIKE_POST,
    payload:{...send,id:insertId}
  })
}
}

export const dislikePost=(id)=>{
  return async dispatch =>{
    await DB.dislikePhoto(id) 
  dispatch({
    type: DISLIKE_POST,
    payload: id
  })
}
}

export const oldlikePost=(name)=>{
  return async dispatch =>{
    await DB.oldLikePhoto(name) 
  dispatch({
    type:OLD_LIKE,
    payload: name
  })
}
}

export const loadDropAnswer=()=>{
  return async dispatch =>{
   let answerdrop = await DB.loadsAnswerDrop()
  dispatch({
    type: LOAD_DROPANSWER,
    payload: answerdrop
  })
}
}


export const addDropAnwer=(send)=>{
  return async dispatch =>{
    let insertId =await DB.addAnswerDrop(send)
  dispatch({
    type:ADD_DROPANSWER,
    payload:{...send,id:insertId}
  })
}
}


export const sendMessage=(send)=>{
  return async dispatch =>{
    let insertId =await DB.addMessage(send)
  dispatch({
    type:ADD_MESSAGE,
    payload:{...send,id:insertId}
  })
}
}

export const loadMessage=()=>{
  return async dispatch =>{
   let messages = await DB.getMessages()
  dispatch({
    type: LOAD_MESSAGE,
    payload: messages
  })
}
}


export const removeMessage=(id)=>{
  return async dispatch =>{
    await DB.deleteMessage(id) 
  dispatch({
    type:REMOVE_MESSAGE,
    payload: id
  })
}
}

export const readMessage=(info)=>{
  return async dispatch =>{
    await DB.readMessages(info)
  dispatch({
    type:READ_MESSAGE,
    payload: info
  })
}
}

export const editProfil=(data)=>{
  return async dispatch =>{
    const resp = await DB.updatePupils(data)
    dispatch(
      {
        type:EDIT_PROFIL,
        payload:data
      } 
    )
  }
}

export const editTeacherPassword=(data)=>{
  return async dispatch =>{
    const resp = await DB.updateTeacherPassword(data)
    dispatch(
      {
        type: TEACHER_PASSWORD,
        payload:data
      } 
    )
  }
}

export const addConfMess=(data)=>{
  return async dispatch =>{
    const id = await DB.addMessConf(data)
    dispatch(
      {
        type: ADD_MESSCONF,
        payload:{id:id,...data}
      } 
    )
  }
}




export const loadsConf = () => {
  return async dispatch => {
    const confMess = await DB.loadConf()
    dispatch({
      type: LOAD_CONF,
      payload: confMess
    })
  }
  
}

export const readsConf = (data) => {
  return async dispatch => {
    await DB.readConf() //удаляем старую табл
    await DB.readConfNext(data) //вставл новую..новую вставить проще,чем удалять что-то в старой
    dispatch({
      type: READ_CONF,
      payload: data
    })
  }
  
}



export const removeMessConf = (id) => {
  return async dispatch => {
    await DB.removeMessOfConf(id)
    dispatch({
      type: REMOVE_MESSCONF,
      payload: id
    })
  }
  
}


export const loadsConfPerson = () => {
  return async dispatch => {
    const confPerson = await DB.loadsConfPerson()
    dispatch({
      type: LOAD_CONFPERSON,
      payload: confPerson
    })
  }
  
}


export const addsConfPerson=(data)=>{
  return async dispatch =>{
    const id = await DB.addConfPerson(data)
    dispatch(
      {
        type: ADD_CONFPERSON,
        payload:{id:id,...data}
      } 
    )
  }
}


export const visibleConfPerson =(data)=>{
  return async dispatch =>{
    await DB.visiblePersonConf(data)
    dispatch(
      {
        type: VISIBLE_CONFPERSON,
        payload:data
      } 
    )
  }
}




export const addGallery=(data)=>{
  return async dispatch =>{
    const id = await DB.addGallery(data)
    dispatch(
      {
        type: ADD_GALLERY,
        payload:{id:id,...data}
      } 
    )
  }
}


export const loadsGallery = () => {
  return async dispatch => {
    const images = await DB.loadGallery()

    dispatch({
      type: LOAD_GALLERY,
      payload: images.reverse()
    })
  }
  
}

export const addComments=(data)=>{
  return async dispatch =>{
    const id = await DB.addComment(data)
    dispatch(
      {
        type: ADD_COMMENTS,
        payload:{id:id,...data}
      } 
    )
  }
}


export const loadsComments = () => {
  return async dispatch => {
    const comments = await DB.loadComments()

    dispatch({
      type: LOAD_COMMENTS,
      payload: comments
    })
  }
  
}


export const delComment=(id)=>{
  return async dispatch =>{
    await DB.deleteComment(id)
   dispatch({
      type: DELETE_COMMENT,
      payload: id
    })
  }
  }

  export const readsComment = (data) => {
    return async dispatch => {
      await DB.readComment() //удаляем старую табл
      await DB.readCommentNext(data) //вставл новую..новую вставить проще,чем удалять что-то в старой
      dispatch({
        type: READ_COMMENT,
        payload: data
      })
    }
    
  }


export const removeNoteOfGallery = (id) => {
  return async dispatch => {
    await DB.removeOneofGallery(id)
    dispatch({
      type: REMOVE_NOTE,
      payload: id
    })
  }
  
}

export const editNoteOfGallery = (info) => {
  return async dispatch => {
    await DB.editOneofGallery(info)
    dispatch({
      type: EDIT_NOTE,
      payload: info
    })
  }
  
}

export const newBadge = (info) => {
  return async dispatch => {
    dispatch({
      type:NEW_BADGE,
      payload: info
    })
  }
  
}

export const workWork = (id) => {
  return async dispatch => {
    dispatch({
      type:NEW_WORK,
      payload: id
    })
  }
  
}

export const pechatMess = (data) => {
  return async dispatch => {
    dispatch({
      type:PECHAT_MESS,
      payload:data
    })
  }
  
}

export const pechatRemove = (id) => {
  return async dispatch=>{
      dispatch({
      type:PECHAT_REMOVE,
      payload:id
    }
      )
    }
}

export const addFriend = (data) => {
 
  return async dispatch=>{
    await DB.addMyFriend(data)
      dispatch({
      type:ADD_FRIEND,
      payload:data
    }
      )
    }
}

export const removeFriend = (data) => {
  return async dispatch=>{
    await DB.addMyFriend(data)
      dispatch({
      type:REMOVE_FRIEND,
      payload:data
    }
      )
    }
}

export const oldFriend = (data) => {
  return async dispatch=>{
    await DB.removePupil() //удаляем старую табл
    await DB.oldMyFriend(data) //вставл новую..новую вставить проще,чем удалять что-то в старой
      dispatch({
      type:OLD_FRIEND,
      payload:data
    }
      )
    }
}

export const loadsTeachers = () => {
  return async dispatch => {
    const teachers = await DB.loadTeachers()
    dispatch({
      type: LOAD_TEACHERS,
      payload: teachers
    })
  }
  
}

export const addTeacher=(data)=>{
  return async dispatch =>{
    const id = await DB.addTeacher(data)
    dispatch(
      {
        type: ADD_TEACHER,
        payload:{id:id,...data}
      } 
    )
  }
}

export const deletepupils=(name)=>{
  return async dispatch =>{
    await DB.deletePupils(name)
    dispatch(
      {
        type: DELETE_PUPILS,
        payload:name
      }
    )
  }
}

export const oneTestWithColor = (info) => {
  return async dispatch => {
    dispatch({
      type:TEST_REFRESH,
      payload: info
    })
  }  
}

export const oneEnglish = (info) => {
  return async dispatch => {
    dispatch({
      type:ENG_REFRESH,
      payload: info
    })
  }  
}


export const addHistory =(info)=>{
  return async dispatch =>{
    const id = await DB.addsHistory(info)
    dispatch(
      {
        type: ADD_HISTORY,
        payload:{id:id,...info}
      }
    )
  } 
}

export const loadsHistory = () => {
  return async dispatch => {
    const histories = await DB.loadHistory()
    dispatch({
      type: LOAD_HISTORY,
      payload: histories
    })
  }
  
}

export const addEnglishTask =(info)=>{
  return async dispatch =>{
    const id = await DB.addEnglish(info)
    dispatch(
      {
        type: ADD_ENGLISH,
        payload:{id:id,...info}
      }
    )
  } 
}

export const loadEnglishTask = () => {
  return async dispatch => {
    const engtaks = await DB.loadEnglish()
    dispatch({
      type: LOAD_ENGLISH,
      payload: engtaks
    })
  }
  
}

export const addEnglishResult =(info)=>{
  return async dispatch =>{
    const id = await DB.addEnglishRes(info)
    dispatch(
      {
        type: ADD_ENGRESULT,
        payload:{id:id,...info}
      }
    )
  } 
}

export const loadEnglishResult = () => {
  return async dispatch => {
    const engres = await DB.loadEnglishRes()
    dispatch({
      type: LOAD_ENGRESULT,
      payload: engres
    })
  }
  
}
//cookie
/*export const getDataC = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      console.log("cookie",value)
    }
  } catch(e) {
    // error reading value
  }
}*/
  
/*export const loadPosts = () => {
  return async dispatch => {
    const posts = await DB.getPosts()

    dispatch({
      type: LOAD_POSTS,
      payload: posts.reverse()//из бд приходят в неправильном порядке..сначала старые,а потом новые..нам нужно наоборот
    })
  }
  
}


export const toogleBooked = post => async dispatch => {
  await DB.updatePost(post)

  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id
  })
}

export const removePost = id => async dispatch => {
  await DB.removePost(id)
  dispatch({
    type: REMOVE_POST,
    payload: id
  })
}



export const addPost = post => async dispatch => {
  const fileName = post.img.split('/').pop()
 const newPath = FileSystem.documentDirectory + fileName
 console.log(post.img)
  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img
    })
  } catch (e) {
    console.log('Error:', e)
  }

 const payload = { ...post, img: newPath }
  const id = await DB.createPost(payload)
console.log(newPath)
  payload.id = id
     
  dispatch({
    type: ADD_POST,
    payload: payload
  })
}*/
import { ADD_POST, REMOVE_BLOCK, REMOVE_POST, UPDATE_POST, UPDATE_THEME,ADD_TEST, DELETE_PHOTO, DELETE_TEST, ADD_MESSAGE, REMOVE_MESSAGE, LOAD_PUPILS, ADD_PUPIL, EDIT_PROFIL, LOAD_TEST, LOAD_MESSAGE, LOAD_THEME, LOAD_GALLERY, ADD_GALLERY, REMOVE_NOTE, EDIT_NOTE, LOAD_COMMENTS, ADD_COMMENTS, LOAD_CONF, ADD_MESSCONF, REMOVE_MESSCONF, DELETE_COMMENT, READ_MESSAGE, READ_CONF, LOAD_MARKS, SEND_TEST, LOAD_CONFPERSON, ADD_CONFPERSON, VISIBLE_CONFPERSON, LOAD_DROP, ADD_DROP, DELETE_DROP, VISIBLE_DROP, UPDATE_DROP, LOAD_DROPANSWER, ADD_DROPANSWER, MARK_DROP, LOAD_LIKE, LIKE_POST, DISLIKE_POST, NEW_BADGE, EDIT_BADGE, NEWCONF_BADGE, EDITCONF_BADGE, READ_COMMENT, OLD_LIKE, TEACHER_PASSWORD, UPDATETHEME_TEST, UPDATE_TEST, NEW_WORK, PECHAT_MESS, PECHAT_REMOVE, ADD_FRIEND, REMOVE_FRIEND, OLD_FRIEND, SEND_COOKIE, LOAD_TEACHERS, ADD_TEACHER, DELETE_PUPILS, TEST_REFRESH, ADD_HISTORY, LOAD_HISTORY, ADD_ENGLISH, LOAD_ENGLISH, ENG_REFRESH, ADD_ENGRESULT, LOAD_ENGRESULT} from '../types'

const initialState = {
  allThemes:[],
  test:[],
messages:[],
students:[],
gallery:[],
comments:[],
conference:[],
marks:[],
confperson:[],
droplist:[],
dropanswer:[],
likepost:[],
newbadge:[],
  loading: true,
  loadinglike:true,
  loadingcomment:true,
  pechat:[],
  teachers:[],
  onetest:[],
  oneeng:[],
  histories:[],
  engtasks:[],
  engresult:[],
  works :[{data:[{name:"Masha", names:"Mashenka",id:"5566"},{name:"Mosha", names:"Moshenka",id:"556566"}],id:"47585954"},{data:[{name:"Вasha",names:"Bashenka",id:"908"},{name:"Вosha",names:"Boshenka",id:"9087"}],id:"95056868"},{data:[{name:"Misha",names:"Mishenka",id:"7652"}],id:"86979707"}]
}
/*test:[{id:"54",name:"Тест 1",test:[{id:"7989",quest:"Свиньи это..",first:"Млекопитающие",second:"Хордовые",third:"Беспозвоночные",answer:"1"},
{id:"7987",quest:"Какая религия не ест свиней?",first:"Христианство",second:"Ислам",third:"Буддизм",answer:"2"}
]}]*/
/*{id:"234",theme:"Животные",data:[{id:"123",image:"https://o-prirode.ru/wp-content/uploads/2018/10/1600x1000-03.jpg",
  value:"Свиньи",
  text:"У культурных пород сохранились некоторые биологические особенности, присущие диким свиньям, — слабое зрение, острый слух, тонкое обоняние, способность хорошо плавать; повышенная плодовитость, способность к быстрому росту и жироотложению. У свиней морда удлинённая, с коротким подвижным хоботком, заканчивающимся голым плоским «пятачком"
}]
}*/
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
case LOAD_DROP:  
return{
  ...state,
  droplist:[...action.payload]
}  
case ADD_DROP:
  return{
    ...state,
    droplist:[action.payload,...state.droplist]
  }
case DELETE_DROP:
    return{
      ...state,
    droplist:state.droplist.filter(el=>el.id!==action.payload)
  }
case VISIBLE_DROP:
  return{
    ...state,
    droplist: state.droplist.map(el=>{
      if(el.id===action.payload.id){
        el.visible = action.payload.visible
      }
      return el
    })
  }
case UPDATE_DROP:
  return{
    ...state,
    droplist: state.droplist.map(el=>{
      if(el.id===action.payload.id){
        el.head = action.payload.head
        el.content = action.payload.content
        el.visible = action.payload.visible
      }
      return el
    })
  }
case LOAD_DROPANSWER:
  return{
    ...state,
    dropanswer:[...action.payload]
  }
case ADD_DROPANSWER:
  return{
    ...state,
    dropanswer:[action.payload,...state.dropanswer]
  }
case MARK_DROP:
  return{
    ...state,
    dropanswer:state.dropanswer.map(el=>{
      if(el.id===action.payload.id){
        el.mark = action.payload.mark
      }
      return el
    })
  }              
case LOAD_MARKS:
  const testmarks = action.payload.map(el=>{
    el.data = JSON.parse(el.data)
    return el
  })
  return{
    ...state,
    marks:[...testmarks],
  }
case LOAD_LIKE:
  return{
    ...state,
    likepost:[...action.payload],
    loadinglike:false
  } 
case LIKE_POST:
  return{
    ...state,
    likepost:[action.payload,...state.likepost]
  }
case DISLIKE_POST:
  return{
    ...state,
    likepost: state.likepost.filter(el=>el.id!==action.payload)
  }     
case SEND_TEST:
  return{
    ...state,
    marks:[action.payload,...state.marks]
  }
case UPDATETHEME_TEST:
  return{
    ...state,
    test:state.test.map(el=>{
      if(el.id===action.payload.id){
        el.name = action.payload.name
      }
      return el
    })
  }
  case UPDATE_TEST:
    return{
      ...state,
      test:state.test.map(el=>{
        if(el.id===action.payload.id){
          el.test = action.payload.test
        }
        return el
      })
    }  
case LOAD_CONFPERSON:
  return{
    ...state,
    confperson:[...action.payload]
  } 
case ADD_CONFPERSON:
  return{
    ...state,
    confperson:[action.payload,...state.confperson]
  }  
case VISIBLE_CONFPERSON:
  return{
    ...state,
    confperson:state.confperson.map(el=>{
      if(el.id===action.payload.id){
        el.visible=action.payload.visible
      }
      return el
    })
  }        
case LOAD_CONF:
  let conf = action.payload.map(el=>{
    el.towhome =JSON.parse(el.towhome)
    el.redirect =JSON.parse(el.redirect)
    if(el.redirect===null){
      el.redirect=[]
    }
    return el
  })
  return{
    ...state,
    conference:[...conf]
  }
case READ_CONF:
  return{
    ...state,
    conference:[...action.payload]
  }  
case ADD_MESSCONF:
  return{
    ...state,
    conference:[...state.conference,action.payload]
  }
case REMOVE_MESSCONF:
  return{
    ...state,
    conference:state.conference.filter(el=>el.id!==action.payload)
  }  
case LOAD_COMMENTS:
  const comm = action.payload.map(el=>{
    el.towhome = JSON.parse(el.towhome)
    el.author = JSON.parse(el.author)
  })
  return{
    ...state,
    comments:[...action.payload],
    loadingcomment:false
  }
  case ADD_COMMENTS:
    return{
      ...state,
      comments:[...state.comments,action.payload]
    }  
case DELETE_COMMENT:
  return{
    ...state,
    comments:state.comments.filter(el=>el.id!==action.payload)
  }    
case READ_COMMENT:
  return{
    ...state,
    comments:[...action.payload]
  }
case LOAD_GALLERY:
    return{
      ...state,
      gallery:[...action.payload] 
    }
case ADD_GALLERY:
  return{
    ...state,
    gallery:[action.payload,...state.gallery]
  }  
case REMOVE_NOTE:
  return{
   ...state,
   gallery: state.gallery.filter(el=>el.id!==action.payload)
  }  
case EDIT_NOTE:
  return{
    ...state,
    gallery: state.gallery.map((el)=>{
      if(el.id===action.payload.id){
        el.comment = action.payload.comment
      }
      return el
    })
  }  
case LOAD_THEME:
  let allthemes = action.payload.map((el)=>{
    el.data = JSON.parse(el.data)
    return el
  })
  return{
    ...state,
    allThemes:[...allthemes]
  }    
case LOAD_PUPILS:
  let dataPupils = action.payload.map((el)=>{
    el.friends = JSON.parse(el.friends)
    return el
  })
  return{
    ...state,
    students:[...dataPupils],
    loading:false
  }
case ADD_PUPIL:
    return{
      ...state,
      students:[...state.students,{...action.payload}]
    }
case TEACHER_PASSWORD:
  return{
    ...state,
    students:state.students.map(el=>{
      if(el.name===action.payload.name){
        el.password = action.payload.password
      }
      return el
    })
  }    
case ADD_POST:
    return{
        ...state,
        allThemes:[{...action.payload},...state.allThemes]
    }
  case UPDATE_THEME:
      return{
          ...state,
          allThemes: state.allThemes.map(elem=>{if(elem.id===action.payload.id){
            elem.theme = action.payload.theme
          }
          return elem
          })
      }
  case UPDATE_POST:
    let find = state.allThemes.find(el=>el.id===action.payload.id)
    let theme=find.theme
    let groupname = find.groupname
    let data = find.data
    let filter = state.allThemes.filter(el=>el.id!==action.payload.id)
    let findel = data.find(el=>el.id===action.payload.data.id)
    let result
    if(findel==undefined){
     result=[...data,{...action.payload.data}]
    }else{
      result=data.map(el=>{
        if(el.id===action.payload.data.id){
          el = {...action.payload.data}
        }
        return el
      })
    }
    return{
      ...state,
      allThemes: [...filter,{id:action.payload.id,theme:theme,data:result,groupname:groupname}]
      }
    /*let find = state.allThemes.find(el=>el.id===action.payload.id)
    let theme=find.theme
    let data = find.data
    let filter = state.allThemes.filter(el=>el.id!==action.payload.id)
    return{
      ...state,
      allThemes: [...filter,{id:action.payload.id,theme:theme,data:data.map(el=>{
        if(el.id===action.payload.data.id){
          el = {...action.payload.data}
        }
        return el
      })}]
      }*/
   case REMOVE_POST:
     return{
       ...state,
       allThemes:state.allThemes.filter(el=>el.id!==action.payload)
     }
   case REMOVE_BLOCK:
    let findd = state.allThemes.find(el=>el.id===action.payload.idlarge)
    let theme1=findd.theme
    let groupname1 = findd.groupname
    let date = findd.data
    let filters = state.allThemes.filter(el=>el.id!==action.payload.idlarge)
     return{
       ...state,
       allThemes:[...filters,{id:action.payload.idlarge,theme:theme1,data:date.filter(el=>el.id!==action.payload.idsmall),groupname:groupname1}]
     }  
  case ADD_TEST:
    return{
      ...state,
      test:[...state.test,{...action.payload}]
    }
  case LOAD_TEST:
    let tests = action.payload.map((el)=>{
      el.test = JSON.parse(el.test)
      return el
    })
    return{
      ...state,
      test:[...tests]
    }  
  case DELETE_PHOTO:
    let findblock= state.allThemes.find(el=>el.id===action.payload.id)
    let themBlock=findblock.theme
    let blockdata = findblock.data
    let filtersId = state.allThemes.filter(el=>el.id!==action.payload.id)
    return{
      ...state,
      allThemes:[...filtersId,{id:action.payload.id,theme:themBlock,data:blockdata.map((elem)=>{
        if(elem.id===action.payload.idmin){
          elem.image=null
        }
        return elem
      })}]
    }
    case DELETE_TEST:
      return{
        ...state,
        test:state.test.filter(elem=>elem.id!==action.payload)
      }
    case READ_MESSAGE:
      return{
        ...state,
        messages:state.messages.map(el=>{
          if(el.name===action.payload.name && el.towhome===action.payload.towhome){
            el.new = action.payload.new
          }
          return el
        })
      }  
    case ADD_MESSAGE:
      let share = action.payload
      if(share.sharepost===null){
        share.sharepost = []
      }
      return{
        ...state,
        messages:[...state.messages,{...share}]
      }  
    case LOAD_MESSAGE:
      let messages = action.payload.map((el)=>{
        el.images = JSON.parse(el.images)
        el.redirect = JSON.parse(el.redirect)
        el.sharepost = JSON.parse(el.sharepost)
        if(el.sharepost===null){
          el.sharepost=[]
        }
        return el
      })
      return{
        ...state,
        messages:[...messages],
        loading:false
      } 

    case REMOVE_MESSAGE:
      return{
        ...state,
        messages:state.messages.filter(elem=>elem.id!==action.payload)
      }  
    case EDIT_PROFIL:
      return{
        ...state,
        students:state.students.map((el)=>{
          if(el.name===action.payload.name){
            el.password = action.payload.password
            el.image = action.payload.image
          }
          return el
        })
      }
    case NEW_BADGE:
      return{
        ...state,
        newbadge:[{...action.payload}]
      } 
    case OLD_LIKE:
      return{
        ...state,
        likepost:state.likepost.map(el=>{
          if(el.author===action.payload){
            el.new = "no"
          }
          return el
        })
      } 
    case NEW_WORK:
      return{
        ...state,
        works:state.works.map(el=>{
          if(el.id===action.payload.id){
            el.data = action.payload.data
          }
          return el
        })
      } 
    case PECHAT_MESS:
      /*let pechatdata 
     let finded = state.pechat.find(el=>el.name===action.payload.name && el.towhome===action.payload.towhome)
       if(finded===undefined){
         pechatdata = action.payload
       }else{
         pechatdata={}
       }*/
      return{
        ...state,
        pechat: [...state.pechat,action.payload]
      }
    case PECHAT_REMOVE:
      return{
        ...state,
        pechat:state.pechat.filter(el=>el.id!==action.payload)
      }
    case ADD_FRIEND:

      return{
        ...state,
        students: state.students.map(el=>{
          if(el.name===action.payload.myname){
            el.friends = action.payload.myfriends
          }
          return el
        })
      } 
    case REMOVE_FRIEND:
      
      return{
        ...state,
        students: state.students.map(el=>{
          if(el.name===action.payload.myname){
            el.friends = action.payload.myfriends
          }
          return el
        })
      }
    case OLD_FRIEND:
      return{
        ...state,
        students: [...action.payload]
      }
    case LOAD_TEACHERS:
      return{
        ...state,
        teachers:[...action.payload]
      }
    case ADD_TEACHER:
      return{
        ...state,
        teachers:[...state.teachers,{...action.payload}]
      }
    case DELETE_PUPILS:
      function filt(val){
        if(val.name!==action.payload && val.groupname===action.payload){
          return false
        }else{
          return true
        }
      } 
      return{
        ...state,
        students:state.students.filter(filt)
      }   
    case TEST_REFRESH:
      return{
        ...state,
        onetest:[...action.payload]
      }
    case ENG_REFRESH:
        return{
          ...state,
          oneeng:[...action.payload]
        }  
    case ADD_HISTORY:
      return{
         ...state,
        histories:[...state.histories,{...action.payload}]
      }
    case LOAD_HISTORY:
        let historiess = action.payload.map(el=>{
          el.data = JSON.parse(el.data)
          return el
        })
        return{
          ...state,
          histories:[...historiess]
        }      
    case ADD_ENGLISH:
      return{
         ...state,
        engtasks:[...state.engtasks,{...action.payload}]
      }
    case LOAD_ENGLISH:
        let eng = action.payload.map(el=>{
          el.data = JSON.parse(el.data)
          return el
        })
        return{
          ...state,
          engtasks:[...eng]
        }
    case ADD_ENGRESULT:
      return{
         ...state,
        engresult:[...state.engresult,{...action.payload}]
      }
    case LOAD_ENGRESULT:
        return{
          ...state,
          engresult:[...action.payload]
        }          
    default:
      return state
  }
}

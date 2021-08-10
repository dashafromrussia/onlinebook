import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('book.db')

export class DB {
    static init() {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, password STRING)',
            [],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
    }

    static init1() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, password STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init2() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS pupilsss (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, password STRING, image STRING, friends STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static init3() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS alltestss (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, test STRING, olimp STRING, groupname STRING, city STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init4() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS chatmessages (id INTEGER PRIMARY KEY NOT NULL, name STRING NOT NULL, mess STRING, towhome STRING, images STRING, new STRING, redirect STRING, sharepost STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static init5() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS themess (id INTEGER PRIMARY KEY NOT NULL, theme STRING NOT NULL, data STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static init7() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS galery (id INTEGER PRIMARY KEY NOT NULL, comment STRING NOT NULL, image STRING, name STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init8() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS commentsfromgalery (id INTEGER PRIMARY KEY NOT NULL, comment STRING NOT NULL, name STRING, idpost INTEGER NOT NULL,towhome STRING, author STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      } 

      static init9() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS conferencealll (id INTEGER PRIMARY KEY NOT NULL, message STRING NOT NULL, name STRING, time STRING, towhome STRING, redirect STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      } 
     


      static init10() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS hiddens (id INTEGER PRIMARY KEY NOT NULL, visible STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init11() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS testsmarksss (id INTEGER PRIMARY KEY NOT NULL, theme STRING, name STRING, time STRING, mark STRING, data STRING, idtest INTEGER NOT NULL, groupname STRING, olimp STRING, city STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init12() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS confperson (id INTEGER PRIMARY KEY NOT NULL, name STRING, visible STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init13() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS droplists (id INTEGER PRIMARY KEY NOT NULL, head STRING, content STRING, visible STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init14() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS dropanswers (id INTEGER PRIMARY KEY NOT NULL, iddrop INTEGER NOT NULL, head STRING, name STRING, answer STRING, time STRING, mark STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }
    

      static init15() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS likesgalery (id INTEGER PRIMARY KEY NOT NULL, idpost INTEGER NOT NULL, name STRING, like STRING, author STRING, new STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static init16() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY NOT NULL, name STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      
      static init17() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS histories (id INTEGER PRIMARY KEY NOT NULL, name STRING, data STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      
      static init18() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS englishtasks (id INTEGER PRIMARY KEY NOT NULL, name STRING, data STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static init19() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS engresult (id INTEGER PRIMARY KEY NOT NULL, idtask STRING, name STRING, result STRING, groupname STRING)',
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static loadEnglishRes() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM engresult`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static addEnglishRes(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO engresult (idtask, name, result, groupname) VALUES (?, ?, ?, ?)`,
              [data.idtask, data.name, data.result, data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      }

      static deleteEnglishRes() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM engresult`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static addEnglish(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO englishtasks (name, data, groupname) VALUES (?, ?, ?)`,
              [data.name,JSON.stringify(data.data),data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static loadEnglish() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM englishtasks`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }




      static addsHistory(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO histories (name, data, groupname) VALUES (?, ?, ?)`,
              [data.name,JSON.stringify(data.data),data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static loadHistory() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM histories`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static loadTeachers() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM teachers`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static addTeacher(name) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO teachers (name) VALUES (?)`,
              [name.name],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteResultTest() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM testsmarksss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static loadsLikePhoto() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM likesgalery`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static addLikePhoto(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO likesgalery (idpost, name, like, author, new) VALUES (?, ?, ?, ?, ?)`,
              [data.idpost, data.name, data.like, data.author, data.new],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

     
      static dislikePhoto(id) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM likesgalery WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      
      static oldLikePhoto(name) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE likesgalery SET new ="no" WHERE author ="${name}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static addAnswerDrop(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO dropanswers (iddrop, head, name, answer, time, mark, groupname) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [data.iddrop, data.head, data.name, data.answer, data.time, data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 
     

      
      static loadsAnswerDrop() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM dropanswers`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static deleteDropAnswer() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM dropanswers`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static saveDropMark(info) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE dropanswers SET mark ="${info.mark}" WHERE id ="${info.id}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static loadsDrop() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM droplists`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static addDrop(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO droplists (head, content, visible, groupname) VALUES (?, ?, ?, ?)`,
              [data.head, data.content, data.visible, data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteDrop(id) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM droplists WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static visibleDropBlock(info) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE droplists SET visible ="${info.visible}" WHERE id ="${info.id}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }
      

      static updateDropBlock(info){ 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE droplists SET head ="${info.head}", content ="${info.content}", visible ="${info.visible}" WHERE id ="${info.id}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static loadsConfPerson() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM confperson`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static deleteConfPerson() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM confperson WHERE NOT (name="Teacher")`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }
    

      static addConfPerson(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO confperson (name,visible) VALUES (?, ?)`,
              [data.name,data.visible],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


static visiblePersonConf(info) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE confperson SET visible ="${info.visible}" WHERE id ="${info.id}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}



      static hiddens() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM hiddens`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static addHiddens(a) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO hiddens (visible) VALUES ("${a}")`,
              [],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteHiddens() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM hiddens`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 




     static addMessConf(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO conferencealll (message, name, time, towhome, redirect, groupname) VALUES (?, ?, ?, ?, ?, ?)`,
              [data.message, data.name, data.time, JSON.stringify(data.towhome),JSON.stringify(data.redirect),data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 
     

      static loadConf() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM conferencealll`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static readConf() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM conferencealll`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }
    
      static readConfNext(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            data.forEach(el=>{
            tx.executeSql(
              `INSERT INTO conferencealll (message, name, time, towhome, redirect, groupname) VALUES (?, ?, ?, ?, ?, ?)`,
              [el.message, el.name, el.time,JSON.stringify(el.towhome),JSON.stringify(el.redirect),el.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
            })
          })
        })
      } 

      static removeMessOfConf(id){
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM conferencealll WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static addComment(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO commentsfromgalery (comment, name, idpost, towhome, author) VALUES (?, ?, ?, ?, ?)`,
              [data.comment, data.name, data.idpost, JSON.stringify(data.towhome), JSON.stringify(data.author)],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static loadComments() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM commentsfromgalery`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


      static deleteComment(id){
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM commentsfromgalery WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }

      static readComment() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM commentsfromgalery`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }
    
      static readCommentNext(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            data.forEach(el=>{
            tx.executeSql(
              `INSERT INTO commentsfromgalery (comment, name, idpost, towhome, author) VALUES (?, ?, ?, ?, ?)`,
              [el.comment, el.name, el.idpost, JSON.stringify(el.towhome), JSON.stringify(el.author)],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
            })
          })
        })
      } 

      static addGallery(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO galery (comment, image, name) VALUES (?, ?, ?)`,
              [data.comment, data.image, data.name],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static loadGallery() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM galery`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static removeOneofGallery(id){
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM galery WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


static editOneofGallery(info) { 
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE galery SET comment ="${info.comment}" WHERE id ="${info.id}"`,
        [],
        resolve,
        (_, error) => reject(error)
      )
    })
  })
}



      static addTheme(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO themess (theme, data, groupname) VALUES (?, ?, ?)`,
              [data.theme, JSON.stringify(data.data), data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static getThemes() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM themess`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static updateTheme(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE themess SET theme ="${data.theme}" WHERE id ="${data.id}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


     static deleteBlockOfTheme(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE themess SET data =? WHERE id =?`,
              [data.all,data.idlarge],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

     static deletePhotoBlock(data){
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE themess SET data =? WHERE id =?`,
            [data.data,data.id],
            resolve,
            (_, error) => reject(error)
          )
        })
      })
     }
    
    static upDateBlock(data){
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `UPDATE themess SET data =? WHERE id =?`,
            [data.databd,data.id],
            resolve,
            (_, error) => reject(error)
          )
        })
      }) 
    }


      static removeTheme(id) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM themess WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteThemes() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM themess`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static addMessage(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO chatmessages (name, mess, towhome, images, new, redirect, sharepost) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [data.name, data.mess, data.towhome, JSON.stringify(data.images), data.new, JSON.stringify(data.redirect), JSON.stringify(data.sharepost)],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 
  
      static getMessages() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM chatmessages`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 
      static deleteMessage(id) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM chatmessages WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteAllMess() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM chatmessages`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static readMessages(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE chatmessages SET new ="${data.new}" WHERE name ="${data.name}" AND towhome="${data.towhome}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static updateThemeTest(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE alltestss SET name =? WHERE id =?`,
              [data.name,data.id],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static updateTest(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE alltestss SET test =? WHERE id =?`,
              [JSON.stringify(data.test),data.id],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static addTest(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO alltestss (name, test, olimp, groupname, city) VALUES (?, ?, ?, ?, ?)`,
              [data.name, JSON.stringify(data.test), data.olimp, data.groupname, data.city],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static getTest() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM alltestss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deleteTest(id) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM alltestss WHERE id=${id}`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }  

      static deleteAllTest() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM alltestss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }  


      static sendMarkTest(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO testsmarksss (theme, name, time, mark, data, idtest, groupname, olimp, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [data.theme, data.name, data.time, data.mark, JSON.stringify(data.data), data.idtest, data.groupname, data.olimp, data.city],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static loadMarks() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM testsmarksss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static addPupils(data) { //добавл учеников учителем
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO pupilsss (name, password, image, friends, groupname) VALUES (?, ?, ?, ?, ?)`,
              [data.name, data.password, data.image, JSON.stringify(data.friends), data.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static getPupils() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM pupilsss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      static deletePupils() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM pupilsss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 

      //`DELETE FROM pupilsss WHERE name!="${name}" AND groupname="${name}"`,
//name!="${name}" AND
      /*static deleteTeacher() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM pupils WHERE id="${4}"`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } */

     /* static deleteMessage() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM messages`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } */


      static updatePupils(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE pupilsss SET image ="${data.image}", password =${data.password} WHERE name ="${data.name}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static addMyFriend(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE pupilsss SET friends =? WHERE name =?`,
              [JSON.stringify(data.myfriends),data.myname],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }

      static oldMyFriend(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            data.forEach(el=>{
            tx.executeSql(
              `INSERT INTO pupilsss (name, password, image, friends, groupname) VALUES (?, ?, ?, ?, ?)`,
              [el.name, el.password, el.image, JSON.stringify(el.friends), el.groupname],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
            })
          })
        })
        
      }
     

      static removePupil() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM pupilsss`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      } 


      static updateTeacherPassword(data) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `UPDATE pupilsss SET password =${data.password} WHERE name ="${data.name}"`,
              [],
              resolve,
              (_, error) => reject(error)
            )
          })
        })
      }


      static loginPupils(login) { 
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM pupilsss WHERE name ="${login.name}" AND password ="${login.password}"`,
              [],
              (_, result) => resolve(result.rows._array),
              (_, error) => reject(error)
            )
          })
        })
      }


  

      static addData(data) {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO login (name, password) VALUES (?, ?)`,
            [data.name, data.password],
            (_, result) => resolve(result.insertId),
            (_, error) => reject(error)
          )
        })
      })
    } 

    static addDataStudents(data) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `INSERT INTO students (name, password) VALUES (?, ?)`,
              [data.name, data.password],
              (_, result) => resolve(result.insertId),
              (_, error) => reject(error)
            )
          })
        })
      } 

}

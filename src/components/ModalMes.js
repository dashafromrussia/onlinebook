import React, {useState} from 'react';
import { StyleSheet, Image, View, Modal,TouchableHighlightComponent, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { Student } from '../components/Student'

export const ModalMes = ({visible,name,onCancel,onOpen}) =>{
   
    const usersWithMe = useSelector(state => state.post.students)
    const users = usersWithMe.filter(el=>el.name!==name)
    
    

    return(
        <Modal visible={visible} animationType="slide">
          <View>
        {users.map(elem=>
            <View key={elem.id}>
            <Student id={elem.id} name={elem.name} myName={name} onOpen={onOpen}/>
            </View>
            )}
        </View>   
         <Button title="<< отмена" onPress={()=>onCancel()}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
       
})
import React, {useState} from 'react';
import { StyleSheet, Image, View, Modal,TouchableHighlightComponent, Button} from 'react-native';

export const EditModal = ({visible,image,onCancel}) =>{


    return(
        <Modal visible={visible} animationType="slide">
            <View style={styles.wrap}>
                <Image style={styles.image} source={{uri:image}}/> 
            </View>
         <Button title="<< Назад" onPress={()=>onCancel()}/>
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
        image: {
          width: '100%',
          height: 400,
        }   
})
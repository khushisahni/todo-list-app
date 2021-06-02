import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export const Header = ()=>{
  return(
    <View style = {styles.header}>
    <Text style = {styles.headerText}>Todo List</Text>
      
      
      

      </View>
  );
}
const styles = StyleSheet.create({
header:{
  marginTop:0,
  justifyContent:'center',
  alignContent:'center',
   padding: 10,
},
headerText:{
  fontSize:20,
  color:'black',
  textAlign:'center',
 
}



})
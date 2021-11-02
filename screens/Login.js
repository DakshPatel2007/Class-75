import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView,TouchableOpacity, Alert } from 'react-native';
import * as firebase from "../config"


export default class LoginScreen extends React.Component {
   login=async(email,password)=>{
     if(email && password){
    try{
      const response = await firebase.auth().signInWithEmailAndPassword(email,password)
      if(response ){
        this.props.navigation.navigate("Transactions")
      }
    } 
    catch(error){
      switch(error.code){
        case "Author/user - not - found": 
        Alert.alert("User doesn't exist")
        break; 
        case "Author/invalid - email": 
        Alert.alert("Incorrect email or password")
      }
    }
     }
     else{Alert.alert ("Enter email and password")}
   }
    render(){
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{width:200, height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
            </View>
            <View>
            <TextInput 
              style={styles.loginBox}
              placeholder="abc@example.com"
              keyBoardType = "email - address"
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
              />
            <TextInput 
              style={styles.loginBox}
              placeholder="Enter password"
              secureTextEntry= { true }
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
      />    
            <TouchableOpacity
              style={{height: 30, width: 90, borderWidth: 1, marginTop: 20, paddingTop: 5, borderRadius: 1}}
              onPress={()=>{this.login(this.state.emailId, this.state.password)}}>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
      ) 
    }
  }
  const styles = StyleSheet.create({
    loginBox: {
      width: 300,
      height: 40,
      borderWidth: 1.5,
      marginLeft: 10,
      padding: 10
    }
})
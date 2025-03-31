import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import google from '../../../Assets/google.png'
import facebook from '../../../Assets/facebook.png'
import { useNavigation } from '@react-navigation/native';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{textAlign:'center',marginLeft:7}}  />
            </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>
        Join our community and experience a seamless finding your relationship.
      </Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#aaa" />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>or</Text>

      {/* Apple Login */}
      <TouchableOpacity style={styles.socialButton}>
      <Image source={facebook} style={{height:hp('5%'),width:wp('7%')}} />
        <Text style={styles.socialText}>Login with Apple</Text>
      </TouchableOpacity>

      {/* Google Login */}
      <TouchableOpacity style={styles.socialButton}>
        <Image source={google} style={{height:hp('5%'),width:wp('7%')}} />
        <Text style={styles.socialText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Register */}
      <Text style={styles.registerText}>
        Haven't registered yet? <Text style={styles.registerLink} onPress={()=>{navigation.navigate("Signup")}}>Register</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
  },
    backIcon:{
    position:'absolute',
    top:15,
    left:15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height:30,
    width:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color:'black'
  },
  subtitle: {
    fontSize: hp('2%'),
    color: '#777',
    marginBottom: hp('3%'),
  },
  label: {
    fontSize: hp('2%'),
    fontWeight: '600',
    marginTop: hp('2%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color:'#000'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
  },
  passwordInput: {
    flex: 1,
    color:'#000'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
    color: 'gray',
  },
  continueButton: {
    backgroundColor: '#ddd',
    paddingVertical: hp('2%'),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  continueText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    color: '#aaa',
    marginVertical: hp('2%'),
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: hp('0.8%'),
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },
  socialText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginLeft: wp('3%'),
  },
  registerText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    marginTop: hp('2%'),
  },
  registerLink: {
    color: 'blue',
    fontWeight: 'bold',
    cursor:'pointer'
  },
});

export default Login;

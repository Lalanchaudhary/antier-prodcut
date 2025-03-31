import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView ,Keyboard,TouchableWithoutFeedback} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  // Form State Object
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
  });

  // Validation Schema
  const validationSchema = Yup.object().shape({
    phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ textAlign: 'center', marginLeft: 7 }} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join our community and experience seamless connections.</Text>

            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              validateOnMount={true}
              onSubmit={(values) => {
                if (!checked) {
                  alert('Please accept the terms and conditions.');
                  return;
                }
                console.log('Final Form Data:', values);
                navigation.navigate('AccountSetup', { formData });
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
                <>
                  <Text style={styles.label}>Phone</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your number"
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      setFieldValue('phone', text);
                      setFormData((prev) => ({ ...prev, phone: text }));
                    }}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => {
                      setFieldValue('email', text);
                      setFormData((prev) => ({ ...prev, email: text }));
                    }}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                  <Text style={styles.label}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#aaa"
                      secureTextEntry={!showPassword}
                      onChangeText={(text) => {
                        setFieldValue('password', text);
                        setFormData((prev) => ({ ...prev, password: text }));
                      }}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="gray" />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Confirm your password"
                      placeholderTextColor="#aaa"
                      secureTextEntry={!showConfirmPassword}
                      onChangeText={(text) => {
                        setFieldValue('confirmPassword', text);
                        // setFormData((prev) => ({ ...prev, confirmPassword: text }));
                      }}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={20} color="gray" />
                    </TouchableOpacity>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                  <View style={styles.checkboxContainer}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => setChecked(!checked)}
                      color="#000"
                    />
                    <Text style={styles.checkboxText}>I agree to the terms and conditions.</Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      { backgroundColor: isValid ? 'black' : '#ddd' },
                    ]}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text style={[styles.continueText, { color: isValid ? 'white' : 'black' }]}>
                      Continue
                    </Text>
                  </TouchableOpacity>

                </>
              )}
            </Formik>

            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
    minHeight: hp('100%'), // Ensures full screen height
  },
  
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
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
    color: '#000'
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
    color: '#000'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp('2%'),
  },
  checkboxText: {
    fontSize: hp('1.8%'),
    color: '#555',
    flex: 1,
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
  loginText: {
    textAlign: 'center',
    fontSize: hp('2%'),
    marginVertical: hp('2%'),
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: hp('1.8%'),
    marginTop: 5,
  },
});

export default Signup;

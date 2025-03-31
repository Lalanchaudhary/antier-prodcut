import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, 
  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AccountSetup = ({ route }) => {
  const { formData } = route.params;
  console.log('====================================');
  console.log(formData);
  console.log('====================================');
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name is too short').required('Name is required'),
    birthDate: Yup.string().required('Birth Date is required'),
    hobby: Yup.string().required('Select a hobby'),
    gender: Yup.string().required('Select your gender'),
  });

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              name: '',
              birthDate: '',
              hobby: '',
              gender: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("ProfileImage", { formData: values });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
              <View       style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{ textAlign: 'center', marginLeft: 7 }} />
                </TouchableOpacity>

                <Text style={styles.title}>Setup Account</Text>
                <Text style={styles.subtitle}>Let's complete your account</Text>

                {/* Name Input */}
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#aaa"
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
                {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                {/* Birth Date Picker */}
                <Text style={styles.label}>Birth Date</Text>
                <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                  <Text style={{ color: values.birthDate ? "#000" : "#aaa" }}>{values.birthDate || "DD/MM/YYYY"}</Text>
                  <MaterialIcons name="calendar-today" size={20} color="gray" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        let formattedDate = selectedDate.toLocaleDateString('en-GB');
                        setFieldValue('birthDate', formattedDate);
                      }
                    }}
                  />
                )}
                {touched.birthDate && errors.birthDate && <Text style={styles.errorText}>{errors.birthDate}</Text>}

                {/* Hobby Dropdown */}
                <Text style={styles.label}>Hobby</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.hobby}
                    onValueChange={(value) => setFieldValue('hobby', value)}
                    style={{ color: '#000' }}
                  >
                    <Picker.Item label="Choose your hobby" value="" />
                    <Picker.Item label="Reading" value="reading" />
                    <Picker.Item label="Traveling" value="traveling" />
                    <Picker.Item label="Sports" value="sports" />
                    <Picker.Item label="Music" value="music" />
                  </Picker>
                </View>
                {touched.hobby && errors.hobby && <Text style={styles.errorText}>{errors.hobby}</Text>}

                {/* Gender Dropdown */}
                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.gender}
                    onValueChange={(value) => setFieldValue('gender', value)}
                    style={{ color: '#000' }}
                  >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
                {touched.gender && errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

                {/* Continue Button */}
                <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
                  <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
    borderRadius: 15,
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
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: hp('1.5%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    justifyContent: 'space-between',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginTop: hp('1%'),
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
  errorText: {
    color: 'red',
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
  },
});

export default AccountSetup;

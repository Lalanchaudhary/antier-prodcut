import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
const ProfileImage = () => {
  const [photo, setPhoto] = useState(null);
  const navigation=useNavigation();
  // Function to pick an image
  const choosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={20} color="black" style={{textAlign:'center',marginLeft:7}}  />
            </TouchableOpacity>
      <Text style={styles.title}>Upload Profile Photo</Text>
      <Text style={styles.subtitle}>Choose from your gallery</Text>

      {/* Profile Photo Upload Box */}
      <TouchableOpacity style={styles.imageContainer} onPress={choosePhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>📷</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.infoText}>1 profile photo required</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.choosePhotoButton} onPress={choosePhoto}>
        <Text style={styles.choosePhotoText}>Choose a photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.maybeLaterButton}>
        <Text style={styles.maybeLaterText}>Maybe later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('8%'),
    alignItems: 'center',
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  subtitle: {
    fontSize: hp('2%'),
    color: '#777',
    marginBottom: hp('3%'),
  },
  imageContainer: {
    width: wp('60%'),
    height: hp('30%'),
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
    backgroundColor: '#f9f9f9',
  },
  imagePlaceholder: {
    fontSize: hp('5%'),
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  infoText: {
    fontSize: hp('1.8%'),
    color: '#888',
    marginBottom: hp('2%'),
  },
  choosePhotoButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  choosePhotoText: {
    fontSize: hp('2.2%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  maybeLaterButton: {
    backgroundColor: '#ddd',
    paddingVertical: hp('2%'),
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  maybeLaterText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default ProfileImage;

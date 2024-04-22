import { StyleSheet } from 'react-native';

// Light theme styles
export const lightThemeStyles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 20,
          marginTop: 20,
        },
        headerContainer: {
          flex: 1,
          alignItems: 'center',
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        heading: {
          fontSize: 20,
          fontFamily: 'PTSerif_700Bold',
        },
        backButton: {
          flexDirection: 'row',
        },
        backButtonText: {
          fontSize: 16,
          fontFamily: 'PTSerif_400Regular',
          marginLeft: 5,
        },
        imageContainer: {
          alignItems: 'center',
          marginBottom: 20,
        },
        profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
        },
        profileInfo: {
          marginBottom: 20,
        },
        profileInfoItem: {
          flexDirection: 'row',
          marginBottom: 10,
        },
        profileInfoTitle: {
          fontFamily: 'PTSerif_700Bold',
          fontSize: 16,
          width: 100,
        },
        valueContainer: {
          backgroundColor: 'white',
          flex: 1,
          padding: 10,
          borderRadius: 5,
        },
        profileInfoText: {
          fontFamily: 'PTSerif_400Regular',
          fontSize: 16,
          color: 'black',
        },
        emergencyContacts: {
          marginBottom: 20,
        },
        emergencyHeading: {
          fontSize: 18,
          fontFamily: 'PTSerif_700Bold',
          marginBottom: 10,
        },
        contactInfo: {
          marginRight: 10,
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#ccc',
          backgroundColor:'white',
        },
      });

// Dark theme styles
export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 20,
      backgroundColor: '#333',
    },
    headerContainer: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontFamily: 'PTSerif_700Bold',
      color: 'white',
    },
    backButton: {
      flexDirection: 'row',
    },
    backButtonText: {
      fontSize: 16,
      fontFamily: 'PTSerif_400Regular',
      marginLeft: 5,
      color: 'white',
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    profileInfo: {
      marginBottom: 20,
    },
    profileInfoItem: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    profileInfoTitle: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 16,
      width: 100,
      color: 'white',
    },
    valueContainer: {
      backgroundColor: 'grey',
      flex: 1,
      padding: 10,
      borderRadius: 5,
    },
    profileInfoText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      color: 'white',
    },
    emergencyContacts: {
      marginBottom: 20,
    },
    emergencyHeading: {
      fontSize: 18,
      fontFamily: 'PTSerif_700Bold',
      marginBottom: 10,
      color: 'white',
    },
    contactInfo: {
      marginRight: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#ccc',
      backgroundColor: '#333',
    },
  });
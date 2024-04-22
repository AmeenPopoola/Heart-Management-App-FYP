import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      marginTop: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
    },
    currentDate: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 10,
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20, 
    },
    videoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10,
    },
    video: {
      width: 300,
      height: 200, 
    },
    timer: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginBottom: 20,
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    instructionBox: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      marginTop: 20,
      borderRadius: 10,
    },
    instructionText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 14,
      textAlign: 'left',
    },
  });

  export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333', 
      marginTop: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#FFFFFF', 
    },
    currentDate: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 10,
      color: '#FFFFFF', 
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20, 
    },
    videoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    video: {
      width: 300,
      height: 200, 
    },
    timer: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginBottom: 20,
      color: '#FFFFFF', 
    },
    scrollView: {
      flex: 1,
      width: '100%',
    },
    instructionBox: {
      backgroundColor: '#444444', 
      padding: 10,
      marginTop: 20,
      borderRadius: 10,
    },
    instructionText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 14,
      textAlign: 'left',
      color: '#FFFFFF', 
    },
  });
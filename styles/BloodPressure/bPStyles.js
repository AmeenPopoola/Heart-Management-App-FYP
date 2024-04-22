import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:25,
    },
    videoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10,
  },
  video: {
      width: 300,
      height: 200,
  },
  heading: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 24,
    marginBottom: 10,
},
    contentContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    placeholderText: {
        color: '#999999', // Placeholder text color
    },
    note: {
        marginBottom: 10,
        color: '#666', 
        fontFamily:'PTSerif_400Regular_Italic',
        fontSize: 15,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
    },
    backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
    },
    dateTime: {
        marginBottom: 10,
        color: 'black',
        fontFamily: 'PTSerif_700Bold',
        fontSize: 14,
        textAlign: 'center',
    },
});
  
  export const darkThemeStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
      },
      videoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10,
    },
    video: {
        width: 300,
        height: 200,
    },
    heading: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 19,
      marginBottom: 10,
      color: '#ffffff',
  },
      contentContainer: {
        backgroundColor: '#292929', 
        borderRadius: 10,
        padding: 20,
        width: '80%',
      },
      input: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#1f1f1f', 
        color: '#ffffff', 
      },
      placeholderText: {
        color: '#FFFFFF', 
    },
      note: {
        marginBottom: 10,
        color: '#999999',
        fontFamily: 'PTSerif_400Regular_Italic',
        fontSize: 15,
      },
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
      },
      backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
        color: '#ffffff', 
      },
      dateTime: {
        marginBottom: 10,
        color: '#cccccc', 
        fontFamily: 'PTSerif_700Bold',
        fontSize: 14,
        textAlign: 'center',
      },
    });
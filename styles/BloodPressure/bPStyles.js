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
        color: '#666', // Adjust color as needed
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
        backgroundColor: '#292929', // Darker content background color
        borderRadius: 10,
        padding: 20,
        width: '80%',
      },
      input: {
        borderWidth: 1,
        borderColor: '#555', // Darker border color
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#1f1f1f', // Dark input background color
        color: '#ffffff', // Dark text color
      },
      placeholderText: {
        color: '#FFFFFF', // Placeholder text color
    },
      note: {
        marginBottom: 10,
        color: '#999999', // Darker text color
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
        color: '#ffffff', // Lighter text color for better visibility
      },
      dateTime: {
        marginBottom: 10,
        color: '#cccccc', // Lighter text color for better visibility
        fontFamily: 'PTSerif_700Bold',
        fontSize: 14,
        textAlign: 'center',
      },
    });
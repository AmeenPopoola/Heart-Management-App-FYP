import { StyleSheet } from "react-native";

export const lightThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 1,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
    },
    header: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginTop: 60,
      marginBottom: 10,
    },
    listHeader: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 16,
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 10,
    },
    itemText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
    },
    square: {
      width: 20,
      height: 20,
      borderRadius: 5,
      marginLeft: 10,
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    legendText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
    },
  });
  
  export const darkThemeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333', 
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 50,
      left: 20,
      zIndex: 1,
    },
    backButtonText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#FFFFFF', 
    },
    header: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 20,
      marginTop: 60,
      marginBottom: 10,
      color: '#FFFFFF', 
    },
    listHeader: {
      fontFamily: 'PTSerif_700Bold',
      fontSize: 16,
      marginBottom: 10,
      color: '#FFFFFF',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#555555', 
      paddingVertical: 10,
    },
    itemText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      color: '#FFFFFF', 
    },
    square: {
      width: 20,
      height: 20,
      borderRadius: 5,
      marginLeft: 10,
      backgroundColor: '#FFFFFF', 
    },
    legendRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    legendText: {
      fontFamily: 'PTSerif_400Regular',
      fontSize: 16,
      marginLeft: 5,
      color: '#FFFFFF', 
    },
  });
  
  export default darkThemeStyles;
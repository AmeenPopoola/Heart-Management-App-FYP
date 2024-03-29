import { StyleSheet } from 'react-native';
import { useFonts, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';


export const ButtonStyles = StyleSheet.create({
  
  button: {
    backgroundColor: '#F21E1E',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'PTSerif_400Regular',
    color: 'white',
    fontSize: 16,
  },
});

export default ButtonStyles;
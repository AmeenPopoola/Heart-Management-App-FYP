import { StyleSheet } from 'react-native';

export const lightThemeButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#F21E1E', // Light mode button color
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // Light mode text color
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
  },
});

export const darkThemeButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'black', // Dark mode button color
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', // Dark mode text color
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
  },
});


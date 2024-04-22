import { StyleSheet } from 'react-native';

export const lightThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    backgroundColor: '#fff', // Light background color
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#ccc', // Light grey box background color
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 10,
    marginTop: 30,
  },
  addReminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addReminderText: {
    marginLeft: 10,
    color: 'red',
    fontFamily: 'PTSerif_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 20,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  reminderInfoContainer: {
    flex: 1,
  },
  reminderInfo: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
  },
  setTimeButton: {
    backgroundColor: '#F21E1E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  setTimeText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PTSerif_400Regular',
  },
});

export const darkThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    backgroundColor: '#333',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#555', 
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 10,
    marginTop: 30,
    color: '#fff', 
  },
  addReminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addReminderText: {
    marginLeft: 10,
    color: 'red',
    fontFamily: 'PTSerif_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555', 
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'PTSerif_700Bold',
    marginBottom: 20,
    color: '#fff', 
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#666', 
    borderRadius: 5,
  },
  reminderInfoContainer: {
    flex: 1,
  },
  reminderInfo: {
    fontSize: 18,
    fontFamily: 'PTSerif_700Bold',
    color: '#fff', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 16,
    marginLeft: 5,
    color: '#fff',
  },
  setTimeButton: {
    backgroundColor: '#F21E1E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  setTimeText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'PTSerif_400Regular',
  },
});
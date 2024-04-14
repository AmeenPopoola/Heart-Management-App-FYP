import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { app,db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import SignUpForm from "../components/sign-up/SignUpForm";


const SignUp = () => {
  const handleSignUp = (email, password) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log('SIGNUP USER', user);

        // Add user data to Firestore
        try {
          const userData = {
            email: email,
            signupDate: new Date().toISOString(),
            role: 'user', // Set default role to 'user'
          };
          await setDoc(doc(db, "users", user.uid), userData);
          console.log("User data added to Firestore");
        } catch (error) {
          console.error("Error adding user data to Firestore: ", error);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("ERROR", error);
      });
  };

  return (
    <View style={styles.container}>
      <SignUpForm onSignUp={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SignUp;
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const loadDefibLocations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'defiblocations'));
    const defibLocations = [];
    querySnapshot.forEach((doc) => {
      // Extract title, location, and description from each document
      const { title, location, description } = doc.data();
      defibLocations.push({
        id: doc.id,
        title: title,
        location: location,
        description: description
      });
    });
    return defibLocations;
  } catch (error) {
    console.error('Error loading defib locations:', error);
    return [];
  }
};

export default loadDefibLocations;

export const addEmergencyContact = (emergencyContacts, newContact) => {
    return [...emergencyContacts, newContact];
  };
  
  export const deleteEmergencyContact = (emergencyContacts, index) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts.splice(index, 1);
    return updatedContacts;
  };
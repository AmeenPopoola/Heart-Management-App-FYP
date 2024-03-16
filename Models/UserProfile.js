class UserProfile {
    constructor(firstName, age, gender, height, weight, emergencyContacts) {
      this.firstName = firstName;
      this.age = age;
      this.gender = gender;
      this.height = height;
      this.weight = weight;
      this.emergencyContacts = emergencyContacts;
    }

     // Getter and setter for firstName
  getFirstName() {
    return this._firstName;
  }

  setFirstName(firstName) {
    this._firstName = firstName;
  }

  // Getter and setter for age
  getAge() {
    return this._age;
  }

  setAge(age) {
    this._age = age;
  }

  // Getter and setter for gender
  getGender() {
    return this._gender;
  }

  setGender(gender) {
    this._gender = gender;
  }

  // Getter and setter for height
  getHeight() {
    return this._height;
  }

  setHeight(height) {
    this._height = height;
  }

  // Getter and setter for weight
  getWeight() {
    return this._weight;
  }

  setWeight(weight) {
    this._weight = weight;
  }

  // Getter and setter for emergencyContacts
  getEmergencyContacts() {
    return this._emergencyContacts;
  }

  setEmergencyContacts(emergencyContacts) {
    this._emergencyContacts = emergencyContacts;
  }
}

export default UserProfile;
  
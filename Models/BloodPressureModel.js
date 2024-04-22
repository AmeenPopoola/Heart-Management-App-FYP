export default class BloodPressureModel {
    static checkBloodPressureCategory(age, systolic, diastolic) {
      if (age >= 80) {
        if (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90) {
          return "High Blood Pressure";
        } else if (parseInt(systolic) >= 145 || parseInt(diastolic) >= 85) {
          return "Ideal Blood Pressure";
        } else {
          return "Normal Blood Pressure";
        }
      } else {
        if (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90) {
          return "High Blood Pressure";
        } else if (parseInt(systolic) >= 135 || parseInt(diastolic) >= 85) {
          return "Ideal Blood Pressure";
        } else {
          return "Normal Blood Pressure";
        }
      }
    }
  }
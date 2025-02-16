// const medications = {
//     "aspirin-marker": {
//       name: "Aspirin",
//       dosage: "100mg",
//       instructions: "Take one pill every 4 hours as needed.",
//     },
//     "ibuprofen-marker": {
//       name: "Ibuprofen",
//       dosage: "200mg",
//       instructions: "Take one pill every 6 hours as needed.",
//     },
//   };
  
//   document.querySelectorAll("a-marker").forEach(marker => {
//     marker.addEventListener("markerFound", () => {
//       const markerId = marker.id;
//       const medication = medications[markerId];
  
//       if (medication) {
//         const textElement = marker.querySelector("a-text");
//         textElement.setAttribute("value", `Pill: ${medication.name}\nDosage: ${medication.dosage}\nInstructions: ${medication.instructions}`);
//       }
//     });
  
//     marker.addEventListener("markerLost", () => {
//       const textElement = marker.querySelector("a-text");
//       textElement.setAttribute("value", ""); // Clear text when marker is lost
//     });
//   });
  
const medications = {
    "antifungal-cream-marker": {
      name: "Antifungal Cream",
      dosage: "Apply as directed.",
      instructions: "Use twice daily on affected areas."
    },
    "fluconazole-marker": {
      name: "Fluconazole",
      dosage: "150mg",
      instructions: "Take one dose orally for yeast infections."
    },
    "terbinafine-marker": {
      name: "Terbinafine",
      dosage: "250mg",
      instructions: "Take one pill daily for fungal infections."
    },
    "clotrimazole-marker": {
      name: "Clotrimazole",
      dosage: "1% cream",
      instructions: "Apply to affected area twice daily."
    },
    "ketoconazole-marker": {
      name: "Ketoconazole",
      dosage: "200mg",
      instructions: "Take one pill daily for fungal infections."
    },
    "omeprazole-marker": {
      name: "Omeprazole",
      dosage: "20mg",
      instructions: "Take one pill daily before meals."
    },
    "ranitidine-marker": {
      name: "Ranitidine",
      dosage: "150mg",
      instructions: "Take one pill before bedtime."
    },
    "aspirin-marker": {
      name: "Aspirin",
      dosage: "81mg",
      instructions: "Take one pill daily for heart health."
    },
    "warfarin-marker": {
      name: "Warfarin",
      dosage: "5mg",
      instructions: "Take one pill daily, monitor INR levels."
    },
    "benadryl-marker": {
      name: "Benadryl",
      dosage: "25mg",
      instructions: "Take one pill every 4 to 6 hours as needed for allergies."
    }
  };
  
  document.querySelectorAll("a-marker").forEach(marker => {
    marker.addEventListener("markerFound", () => {
      const markerId = marker.id;
      const medication = medications[markerId];
  
      if (medication) {
        const textElement = marker.querySelector("a-text");
        textElement.setAttribute("value", `Pill: ${medication.name}\nDosage: ${medication.dosage}\nInstructions: ${medication.instructions}`);
      }
    });
  
    marker.addEventListener("markerLost", () => {
      const textElement = marker.querySelector("a-text");
      textElement.setAttribute("value", ""); // Clear text when marker is lost
    });
  });
  
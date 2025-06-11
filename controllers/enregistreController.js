// // controllers/enregistreController.js
// const { db } = require("../firebase");

// async function enregistrerDansFirestore(donnees) {
//   try {
//     // Vérifie si le RFID existe déjà dans Firestore
//     const snapshot = await db.collection("users").where("rfid", "==", donnees.rfid).get();

//     if (!snapshot.empty) {
//       throw new Error("Ce RFID est déjà utilisé dans Firestore");
//     }

//     // Ajoute les données dans Firestore
//     const docRef = await db.collection("users").doc(donnees.userId).set({
//       nom: donnees.firstName,
//       prenom: donnees.lastName,
//       rfid: donnees.rfid,
//       userId: donnees.userId,
//       createdAt: new Date()
//     });

//     console.log("✅ Utilisateur ajouté à Firestore avec ID:", donnees.userId);
//   } catch (error) {
//     console.error("❌ Erreur Firestore:", error.message);
//     throw error;
//   }
// }

// module.exports = enregistrerDansFirestore;


const { db } = require("../firebase");

async function enregistrerDansFirestore(donnees) {
  try {
    // Vérifie si un utilisateur avec ce rfid existe déjà dans Firestore
    const snapshot = await db.collection("users").where("rfid", "==", donnees.rfid).get();

    if (!snapshot.empty) {
      console.warn("⚠️ Ce RFID existe déjà dans Firestore (double entrée évitée)");
      return;
    }

    // Enregistre dans Firestore
    const docRef = await db.collection("users").add({
      name: donnees.name,
      rfid: donnees.rfid,
      userId: donnees.userId
    });

    console.log("✅ Données enregistrées dans Firestore avec l'ID :", docRef.id);
  } catch (error) {
    console.error("❌ Erreur Firestore :", error.message);
    throw error;
  }
}

module.exports = enregistrerDansFirestore;

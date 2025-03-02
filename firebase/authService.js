import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"; // Added db import for Firestore
import { doc, getDoc, setDoc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";


// ✅ Sign up user with role-based Firestore storage
export const signUpUser = async (email, password, additionalData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);

    // 🔥 Store role-specific user data under "/users/{uid}/roles/{role}"
    const userRoleRef = doc(db, "users", user.uid, "roles", additionalData.role);
    const userRoleSnap = await getDoc(userRoleRef);

    if (userRoleSnap.exists()) {
      throw new Error(`An account with the role "${additionalData.role}" already exists for this email.`);
    }

    await setDoc(userRoleRef, {
      uid: user.uid,
      email: user.email,
      role: additionalData.role,
      name: additionalData.name,
      cnic: additionalData.cnic,
      dob: additionalData.dob,
      photos: additionalData.photos,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Sign-up Error:", error.message);
    throw error;
  }
};


// Check if the user's email is verified
export const checkVerificationStatus = async (user) => {
  try {
    await user.reload();
    return user.emailVerified;
  } catch (error) {
    console.error("Verification Check Error:", error.message);
    throw error;
  }
};

// Resend verification email
export const resendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    return true;
  } catch (error) {
    console.error("Resend Verification Error:", error.message);
    throw error;
  }
};

// Delete unverified users
export const deleteUnverifiedUser = async (user) => {
  try {
    await deleteUser(user);
    console.log("Unverified user deleted.");
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};

// Login function with email verification check
// Login function with role verification
// ✅ Login with updated Firestore structure
export const loginUser = async (email, password, selectedRole) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔒 Check email verification
    await user.reload();
    if (!user.emailVerified) {
      throw new Error("Email not verified. Please check your email.");
    }

    // 🎯 Check role existence in Firestore
    const userRoleDocRef = doc(db, "users", user.uid, "roles", selectedRole);
    const userRoleDocSnap = await getDoc(userRoleDocRef);

    if (userRoleDocSnap.exists()) {
      return user; // 🎉 Role exists, login successful
    } else {
      throw new Error(
        `No "${selectedRole}" account found for this email. Please sign up as a ${selectedRole}.`
      );
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};



// Function to send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    return { success: false, message: error.message };
  }
};

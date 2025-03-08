import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f6ece5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5d4940",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#5d4940",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8e1dc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#374151",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center", // Changed from "space-between"
    alignItems: "center", // Added to ensure vertical centering
    marginVertical: 10,
    marginVertical: 10, //gender
    gap: 15, //gender
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10, // Added to create space between radio buttons
  },
  radioOuterCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5d4940",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#5d4940",
  },
  radioText: {
    fontSize: 14,
    color: "#374151",
  },
  button: {
    backgroundColor: "#5d4940",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  link: {
    color: "#5d4940",
    fontWeight: "bold",
    marginLeft: 5,
  },
  signUpText: {
    marginTop: 25,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  signUpLink: {
    color: "#5d4940",
    fontWeight: "bold",
  },

  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#5d4940",
    borderRadius: 12,
    backgroundColor: "#f7f2ef",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  uploadText: {
    marginLeft: 10,
    color: "#5d4940",
    fontSize: 16,
    fontWeight: "500",
  },

  previewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  imageWrapper: {
    position: "relative",
    width: 150,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  //Gender
  genderLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5d4940",
    marginBottom: 5,
  },

  imageLabel: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 12,
  },

  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    padding: 2,
  },

});

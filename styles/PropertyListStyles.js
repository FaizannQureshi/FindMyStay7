import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6ece5", paddingLeft: 16, paddingRight: 16, paddingTop: 35 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16, marginLeft: 8, marginTop: 16 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 66, marginTop: 0 },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 16, marginLeft: 116 },
  highlight: { color: "#5d4940", fontWeight: "bold" },

  input: {
    backgroundColor: "#e8e1dc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginRight: 16,
  },
  uploadText: { marginLeft: 8, color: "white" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },

  facility: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  facilityText: { fontSize: 16 },
  pricing: { fontSize: 16, color: "gray", marginBottom: 4 },

  terms: { fontSize: 12, color: "gray", marginVertical: 16 },

  uploadButtonFinal: {
    backgroundColor: "#5d4940",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: { color: "#fff", fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray" },

  // New Dropdown Styles (Styled to Match Your Theme)
  dropdownContainer: {
    backgroundColor: "#e8e1dc", // Matches input fields
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#5d4940", // Matches your highlight color
    fontWeight: "bold",
  },

  // New Styles for Price Input & Room Type Selection
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 8,
  },
  priceInput: {
    backgroundColor: "#e8e1dc",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  roomTypeContainer: {
    backgroundColor: "#f2e7df",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#856c61',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 8,
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '48%',
    padding: 5,
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
});

export default styles;

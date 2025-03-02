import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6ece5", paddingLeft: 16, paddingRight: 16, paddingTop: 35, paddingBottom: 35, marginBottom: 5 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center", 
    paddingTop: 120,
  },
  location: { flexDirection: "row", alignItems: "center" },
  locationText: { marginLeft: 4, fontSize: 16, color: "black" },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  categoryButton: { padding: 10, borderRadius: 20, backgroundColor: "#e8e1dc" },
  categoryButtonActive: { backgroundColor: "#5d4940" },
  categoryText: { color: "black" },
  categoryTextActive: { color: "white" },
  section: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", paddingBottom: 10, paddingRight: 30 },
  seeAllText: { color: "#5d4940" },
  card: {
    width: 200,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#e8e1dc",
  },
  cardImage: { height: 120, width: "100%" },
  heartIcon: { position: "absolute", top: 10, right: 10 },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardLocation: { fontSize: 12, color: "gray", marginVertical: 5 },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardPrice: { fontWeight: "bold", color: "black" },
  cardRating: { flexDirection: "row", alignItems: "center" },
  footerButton: {
    backgroundColor: "#5d4940",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray" },

  listButton: {
    backgroundColor: "#5d4940",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  listButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },


  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 25,
    marginBottom: 25,  
  },
  location: { fontSize: 16, color: "gray" },
  listButton: {
    backgroundColor: "#5d4940",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  listButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default styles;

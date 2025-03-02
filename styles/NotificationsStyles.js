import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6ece5', padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 100 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e1dc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: 'rgb(211, 200, 195)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  notificationTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  notificationSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  notificationImage: { width: 50, height: 50, borderRadius: 8, marginRight: 16 },
});

export default styles;

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6ece5',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
    backgroundColor: '#5d4940',
  },
  backButton: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 800,
    marginRight: 16,
    marginTop: -8,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 90,
    paddingTop: 50,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e8e1dc',
  },
  activeTab: {
    backgroundColor: '#5d4940',
  },
  tabText: {
    color: '#5d4940',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookingsList: {
    paddingHorizontal: 16,
  },
  bookingCard: {
    backgroundColor: '#e8e1dc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  bookingDate: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingLocation: {
    fontSize: 12,
    color: '#777',
  },
  bookingRating: {
    fontSize: 12,
    color: '#000',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: '#5d4940',
  },
  detailsButton: {
    backgroundColor: '#5d4940',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsText: {
    color: '#fff',
  },
});

export default styles;

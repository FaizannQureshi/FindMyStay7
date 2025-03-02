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
    paddingLeft: 95,
    paddingTop: 50,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#5d4940',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#ddd',
    fontSize: 14,
  },
  editIcon: {
    marginLeft: 'auto',
    backgroundColor: 'rgb(190, 177, 171)',
    padding: 6,
    borderRadius: 20,
  },
  menu: {
    flex: 1,
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#5d4940',
    padding: 15,
    alignItems: 'center',
    margin: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 70,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#aaa',
  },
  activeNavText: {
    color: '#5d4940',
    fontWeight: 'bold',
  },

  
});

export default styles;

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    zIndex: 999,
    elevation: 10,
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#2ecc71',
  },
  error: {
    backgroundColor: '#e74c3c',
  },
  info: {
    backgroundColor: '#2F80ED',
  },
});

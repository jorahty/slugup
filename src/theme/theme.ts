import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#08f',
  white: '#fff',
  grey100: '#f5f5f5',
  grey200: '#ddd',
  grey300: '#ccc',
  grey400: '#aaa',
  grey500: '#777',
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  buttonText: {
    fontWeight: '700',
    color: colors.white,
  },
});

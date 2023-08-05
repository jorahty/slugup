import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#08f',
  white: '#fff',
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

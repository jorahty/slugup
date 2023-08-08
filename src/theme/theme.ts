import { StyleSheet } from 'react-native';

export const colors = {
  blue: '#08f',
  white: '#fff',
  grey100: '#f5f5f5',
  grey200: '#ddd',
  grey300: '#ccc',
  grey400: '#aaa',
  grey500: '#777',
  danger: '#e45',
  darkBlue: '#07f',
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: colors.blue,
    minHeight: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minWidth: 55,
  },
  buttonText: {
    fontWeight: '700',
    color: colors.white,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  buttonOutlined: {
    backgroundColor: 'transparent',
    borderColor: colors.grey400,
  },
  buttonOutlinedText: {
    color: colors.grey500,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 18,
  },
  textInput: {
    minWidth: 200,
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    borderColor: colors.grey400,
    backgroundColor: colors.white,
  },
  disabled: {
    opacity: 0.5,
  },
  headline: {
    fontSize: 18,
    fontWeight: '700',
  },
  message: {
    borderRadius: 15,
    backgroundColor: colors.grey300,
    padding: 20,
    marginVertical: 5,
  },
  messageText: {
    fontWeight: '600',
  },
  messageSent: {
    backgroundColor: colors.blue,
  },
  messageSentText: {
    color: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  link: {
    color: colors.darkBlue,
    fontWeight: '600',
  },
  formInput: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

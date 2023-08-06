import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';

import { colors, styles } from '../../theme/theme';
import { useViewModel } from '../../model/ViewModel';
import Button from '../common/Button';
import Divider from '../common/Divider';

export default function Auth() {
  const {
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    signUpWithEmail,
  } = useViewModel();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ width: '100%', maxWidth: 250, gap: 15 }}>
        <Button
          title="Continue with Google"
          onPress={signInWithGoogle}
          variant="outlined"
        />
        <Button
          title="Continue with Apple"
          onPress={signInWithApple}
          variant="outlined"
        />
        <Divider />
        <TextInput
          autoCapitalize="none"
          placeholder="email@address.com"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
          placeholderTextColor={colors.grey500}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.textInput}
          placeholderTextColor={colors.grey500}
        />
        <Button title="Sign in" onPress={signInWithEmail} />
        <Button title="Sign up" onPress={signUpWithEmail} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

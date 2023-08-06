import { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import Divider from '../common/Divider';
import {
  signInWithGoogle,
  signInWithApple,
  signInWithEmail,
  signUpWithEmail,
} from '../../repo/auth';

const GoogleLogo = require('../../../assets/google-logo.png');
const AppleLogo = require('../../../assets/apple-logo.png');

export default function Auth() {
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
          decorator={
            <Image source={GoogleLogo} style={{ width: 23.5, height: 24 }} />
          }
        />
        <Button
          title="Continue with Apple"
          onPress={signInWithApple}
          variant="outlined"
          decorator={
            <Image source={AppleLogo} style={{ width: 19.5, height: 24 }} />
          }
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
        <Button
          title="Sign in"
          onPress={() => signInWithEmail({ email, password })}
        />
        <Button
          title="Sign up"
          onPress={() => signUpWithEmail({ email, password })}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

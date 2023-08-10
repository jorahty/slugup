import { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Image,
  View,
} from 'react-native';

import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import Divider from '../common/Divider';
import * as AuthRepo from '../../repo/auth';

const Logo = require('../../../assets/logo.png');
const GoogleLogo = require('../../../assets/google-logo.png');
const AppleLogo = require('../../../assets/apple-logo.png');

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    await AuthRepo.signInWithGoogle();
    setLoading(false);
  }

  async function signInWithApple() {
    setLoading(true);
    await AuthRepo.signInWithApple();
    setLoading(false);
  }

  async function signInWithEmail() {
    setLoading(true);
    await AuthRepo.signInWithEmail({ email, password });
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    await AuthRepo.signUpWithEmail({ email, password });
    setLoading(false);
  }

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
        <View style={{ alignItems: 'center' }}>
          <Image source={Logo} style={{ width: 628 / 4, height: 548 / 4 }} />
        </View>
        <Button
          title="Continue with Google"
          onPress={signInWithGoogle}
          loading={loading}
          variant="outlined"
          decorator={
            <Image source={GoogleLogo} style={{ width: 23.5, height: 24 }} />
          }
        />
        <Button
          title="Continue with Apple"
          onPress={signInWithApple}
          loading={loading}
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
        <Button title="Sign in" onPress={signInWithEmail} loading={loading} />
        <Button title="Sign up" onPress={signUpWithEmail} loading={loading} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

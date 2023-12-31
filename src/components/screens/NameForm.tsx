import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';

import { supabase } from '../../lib/supabase';
import { useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';

export default function NameForm() {
  const { user, setUser } = useViewModel();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitName() {
    setLoading(true);
    await supabase
      .from('profiles')
      .update([{ full_name: name }])
      .eq('id', user.id);
    Keyboard.dismiss();
    setName('');
    setLoading(false);
    setUser({ ...user, full_name: name });
  }

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          width: '100%',
          maxWidth: 250,
          gap: 20,
          alignItems: 'flex-start',
          marginBottom: 200,
        }}>
        <Text style={styles.headline}>What should we call you?</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.textInput}
          placeholderTextColor={colors.grey500}
        />
        <Button
          title="Continue"
          onPress={submitName}
          disabled={name.length < 1}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

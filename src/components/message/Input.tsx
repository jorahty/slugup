import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from '../../lib/supabase';
import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import { FontAwesome } from '@expo/vector-icons';

export default function MessageInput() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    // await supabase.from('posts').insert([{ content }]);
    Keyboard.dismiss();
    setContent('');
    setLoading(false);
  }

  const insets = useSafeAreaInsets();

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 91 : 0}>
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: colors.grey300,
            flexDirection: 'row',
            gap: 20,
          }}>
          <TextInput
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Message"
            value={content}
            onChangeText={setContent}
            onSubmitEditing={content ? sendMessage : undefined}
          />
          <Button
            onPress={sendMessage}
            disabled={content.length < 1}
            loading={loading}
            decorator={<FontAwesome name="send" style={styles.buttonIcon} />}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: insets.bottom, backgroundColor: colors.white }} />
    </>
  );
}

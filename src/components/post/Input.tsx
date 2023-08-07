import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import { FontAwesome } from '@expo/vector-icons';

export default function PostInput() {
  const [content, setContent] = useState('');

  function sendPosting() {
    console.log('yo');
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
            placeholder="New Posting"
            value={content}
            onChangeText={setContent}
            onSubmitEditing={content ? sendPosting : undefined}
          />
          <Button
            decorator={<FontAwesome name="send" style={styles.buttonIcon} />}
            onPress={sendPosting}
            // disabled={content.length < 1}
          />
        </View>
      </KeyboardAvoidingView>
      <View style={{ height: insets.bottom, backgroundColor: colors.white }} />
    </>
  );
}

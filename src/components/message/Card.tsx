import { Text, View } from 'react-native';

import { Message, useViewModel } from '../../model/ViewModel';
import { styles } from '../../theme/theme';

interface Props {
  message: Message;
}

export default function MessageCard({ message }: Props) {
  const wasSent = message.sender === 'loginResponse.id';

  return (
    <View style={{ alignItems: wasSent ? 'flex-end' : 'flex-start' }}>
      <View style={[styles.message, wasSent && styles.messageSent]}>
        <Text style={[styles.messageText, wasSent && styles.messageSentText]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

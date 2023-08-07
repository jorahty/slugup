import { View } from 'react-native';

import MessageList from '../message/List';
import MessageInput from '../message/Input';

export default function Chat() {
  return (
    <View style={{ flex: 1 }}>
      <MessageList />
      <MessageInput />
    </View>
  );
}

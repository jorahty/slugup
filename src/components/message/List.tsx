import { FlatList } from 'react-native';

export default function MessageList() {
  return (
    <FlatList
      data={[]}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <></>}
    />
  );
}

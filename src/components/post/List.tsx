import { useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  return (
    <FlatList
      data={posts}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <Text>item</Text>}
    />
  );
}

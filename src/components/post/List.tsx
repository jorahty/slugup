import { useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  return (
    <FlatList
      style={{ height: 0 }}
      data={posts}
      renderItem={({ item }) => <Text>item</Text>}
    />
  );
}

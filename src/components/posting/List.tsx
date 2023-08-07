import { useState } from 'react';
import { FlatList, Text } from 'react-native';

export default function PostingList() {
  const [postings, setPostings] = useState([]);

  return (
    <FlatList
      style={{ height: 0 }}
      data={postings}
      renderItem={({ item }) => <Text>item</Text>}
    />
  );
}

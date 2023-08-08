import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { User, useViewModel } from '../../model/ViewModel';
import { supabase } from '../../lib/supabase';

export default function Chats() {
  const { user } = useViewModel();
  const [chats, setChats] = useState<User[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      // fetch chats with `user`
      // call `setChats`
    };
    fetchChats();
  });

  if (chats.length === 0)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text>You haven't sent or received any messages yet</Text>
      </View>
    );

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
    />
  );
}

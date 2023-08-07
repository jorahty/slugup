import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import { supabase } from '../../lib/supabase';
import { Message } from '../../model/ViewModel';
import Loading from '../common/Loading';

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase
        .from('messages')
        .select()
        .order('date', { ascending: false })
        .range(0, 30);
      if (error) alert(error.message);
      else setMessages(data as any);
      if (loading) setLoading(false);
    };
    fetchPosts();

    const messageListener = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        async (payload) => {
          setMessages((messages) => {
            if (payload.eventType === 'INSERT') {
              return [payload.new as any, ...messages];
            } else {
              return messages.filter(
                (message) => message.id !== payload.old.id
              );
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageListener);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <FlatList
      inverted
      data={messages}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
    />
  );
}

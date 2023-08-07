import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';

import { supabase } from '../../lib/supabase';
import { Message, useViewModel } from '../../model/ViewModel';
import Loading from '../common/Loading';
import MessageCard from './Card';

export default function MessageList() {
  const { selectedUser } = useViewModel();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase
        .from('messages')
        .select()
        .or(`sender.eq.${selectedUser.id},receiver.eq.${selectedUser.id}`)
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
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => <MessageCard message={item} />}
    />
  );
}

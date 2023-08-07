import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

interface Post {
  id: string;
  poster: string;
  content: string;
  date: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase.from('posts').select();
      if (error) alert(error.message);
      else setPosts(data!);
      setLoading(false);
    };
    fetchPosts();

    const postListener = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((prevPosts) => {
            if (payload.eventType === 'INSERT') {
              return [payload.new as Post, ...prevPosts];
            } else {
              return prevPosts.filter((post) => post.id !== payload.old.id);
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postListener);
    };
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <FlatList
      data={posts}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
    />
  );
}

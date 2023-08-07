import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { supabase } from '../../lib/supabase';

interface Post {
  id: string;
  poster: string;
  content: string;
  date: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data } = await supabase.from('posts').select();
      setPosts(data!);
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

  return (
    <FlatList
      data={posts}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
    />
  );
}

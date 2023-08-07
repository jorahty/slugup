import { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { supabase } from '../../lib/supabase';
import Loading from '../common/Loading';

export interface User {
  id: string;
  full_name: string;
  avatar_url: string;
}

interface Post {
  id: string;
  content: string;
  date: string;
  profiles: User;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data, error } = await supabase.from('posts').select(`
        id,
        content,
        date,
        profiles ( id, full_name, avatar_url )
      `);
      if (error) alert(error.message);
      else setPosts(data as any);
      setLoading(false);
    };
    fetchPosts();

    const postListener = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            let { data, error } = await supabase
              .from('posts')
              .select(
                `
                  id,
                  content,
                  date,
                  profiles ( id, full_name, avatar_url )
                `
              )
              .eq('id', payload.new.id);
            if (error) alert(error.message);
            setPosts((prevPosts) => {
              return [data![0] as any, ...prevPosts];
            });
          } else {
            setPosts((prevPosts) => {
              return prevPosts.filter((post) => post.id !== payload.old.id);
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postListener);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <FlatList
      data={posts}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
    />
  );
}

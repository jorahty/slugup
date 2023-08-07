import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { supabase } from '../../lib/supabase';
import Loading from '../common/Loading';
import PostCard from './Card';

interface User {
  id: string;
  full_name: string;
  avatar_url: string;
}

export interface Post {
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
        .order('date', { ascending: false })
        .range(0, 30);
      if (error) alert(error.message);
      else setPosts(data as any);
      if (loading) setLoading(false);
    };
    const intervalId = setInterval(() => fetchPosts(), 5000);

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
              if (prevPosts.some((post) => post.id === payload.new.id)) {
                return prevPosts;
              } else {
                return [data![0] as any, ...prevPosts];
              }
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
      clearInterval(intervalId);
      supabase.removeChannel(postListener);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <FlatList
      data={posts}
      style={{ height: 0 }}
      keyboardDismissMode="on-drag"
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}

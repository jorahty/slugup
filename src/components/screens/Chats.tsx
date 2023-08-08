import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { User, useViewModel } from '../../model/ViewModel';
import { supabase } from '../../lib/supabase';
import { colors, styles } from '../../theme/theme';
import { FontAwesome } from '@expo/vector-icons';
import Loading from '../common/Loading';

const Avatar = require('../../../assets/avatar.png');

export default function Chats() {
  const { navigate } = useNavigation<any>();
  const { setSelectedUser } = useViewModel();
  const [chats, setChats] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase.rpc('get_chats');
      if (error) console.log(error.message);
      else setChats(data);
      setLoading(false);
    };
    fetchChats();
  }, []);

  if (loading) return <Loading />;

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
      renderItem={({ item: user }) => (
        <TouchableOpacity
          onPress={() => {
            setSelectedUser(user);
            navigate('Chat');
          }}
          style={{
            flexDirection: 'row',
            padding: 20,
            gap: 20,
            backgroundColor: colors.white,
            borderBottomWidth: 1,
            borderBottomColor: colors.grey300,
            alignItems: 'center',
          }}>
          <Image
            source={user.avatar_url ? { uri: user.avatar_url } : Avatar}
            style={{ width: 60, height: 60, borderRadius: 10 }}
          />
          <Text style={[styles.headline, { flex: 1 }]}>{user.full_name}</Text>
          <FontAwesome name="chevron-right" size={18} />
        </TouchableOpacity>
      )}
    />
  );
}

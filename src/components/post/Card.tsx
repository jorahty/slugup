import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Post, useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';
import formatISOString from '../../util/formatISOString';

const Avatar = require('../../../assets/avatar.png');

export default function PostCard({ post }: { post: Post }) {
  const { setSelectedPost } = useViewModel();

  return (
    <TouchableOpacity
      onPress={() => setSelectedPost(post)}
      style={{
        flexDirection: 'row',
        padding: 20,
        gap: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey300,
      }}>
      <Image
        source={
          post.profiles.avatar_url ? { uri: post.profiles.avatar_url } : Avatar
        }
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
      <View style={{ flex: 1, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.headline}>{post.profiles.full_name}</Text>
          <Text>{formatISOString(post.date)}</Text>
        </View>
        <Text>{post.content}</Text>
      </View>
    </TouchableOpacity>
  );
}

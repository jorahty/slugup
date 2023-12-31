import { Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { supabase } from '../../lib/supabase';
import { useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import { useState } from 'react';

export default function PostMenu() {
  const { session, selectedPost, setSelectedPost, setSelectedUser } =
    useViewModel();
  const { navigate } = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const close = () => {
    setSelectedPost(null);
  };

  const removePost = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', selectedPost.id);
    if (error) alert(error);
    close();
    setLoading(false);
  };

  const messageUser = () => {
    setSelectedUser(selectedPost.profiles);
    navigate('Chat');
    close();
  };

  const viewUserProfile = () => {
    setSelectedUser(selectedPost.profiles);
    navigate('Profile');
    close();
  };

  const insets = useSafeAreaInsets();

  return (
    <Modal visible={selectedPost !== null} transparent>
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'flex-end',
            width: '100%',
            maxWidth: 900,
          }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderTopWidth: 2,
              borderColor: colors.grey300,
              paddingBottom: insets.bottom,
            }}>
            <View style={{ padding: 20, gap: 20 }}>
              {session?.user.id === selectedPost?.profiles.id ? (
                <Button
                  loading={loading}
                  title="Remove Post"
                  onPress={removePost}
                  decorator={
                    <FontAwesome name="trash" style={styles.buttonIcon} />
                  }
                  variant="danger"
                />
              ) : (
                <>
                  <Button
                    loading={loading}
                    title={`Send Message to ${selectedPost?.profiles.full_name}`}
                    onPress={messageUser}
                    decorator={
                      <Ionicons name="chatbubbles" style={styles.buttonIcon} />
                    }
                  />
                  <Button
                    loading={loading}
                    title={`View ${selectedPost?.profiles.full_name}'s Profile`}
                    onPress={viewUserProfile}
                    decorator={
                      <Ionicons name="person" style={styles.buttonIcon} />
                    }
                  />
                </>
              )}
              <Button
                loading={loading}
                title="Close"
                onPress={close}
                variant="outlined"
                decorator={
                  <FontAwesome
                    name="close"
                    style={[styles.buttonIcon, styles.buttonOutlinedText]}
                  />
                }
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

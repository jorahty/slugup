import { Modal, Pressable, SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { supabase } from '../../lib/supabase';
import { useViewModel } from '../../model/ViewModel';
import { colors, styles } from '../../theme/theme';
import Button from '../common/Button';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function PostMenu() {
  const { selectedPost, setSelectedPost } = useViewModel();
  const [session, setSession] = useState<null | Session>(null);
  const { navigate } = useNavigation<any>();

  const close = () => {
    setSelectedPost(null);
  };

  const removePost = async () => {
    await supabase.from('posts').delete().eq('id', selectedPost.id);
    close();
  };

  const messageUser = () => {
    // set selected user
    navigate('Chat');
    close();
  };

  const viewUserProfile = () => {
    // set selected user
    navigate('Profile');
    close();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (!selectedPost) return <></>;

  return (
    <Modal transparent>
      <Pressable
        onPress={close}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#00000077',
            flex: 1,
            justifyContent: 'flex-end',
            width: '100%',
            maxWidth: 900,
          }}>
          <SafeAreaView
            style={{
              backgroundColor: colors.white,
              borderTopWidth: 2,
              borderColor: colors.grey300,
            }}>
            <View style={{ padding: 20, gap: 20 }}>
              {session?.user.id === selectedPost.profiles.id ? (
                <Button
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
                    title={`Send Message to ${selectedPost?.profiles.full_name}`}
                    onPress={messageUser}
                    decorator={
                      <Ionicons name="chatbubbles" style={styles.buttonIcon} />
                    }
                  />
                  <Button
                    title={`View ${selectedPost?.profiles.full_name}'s Profile`}
                    onPress={viewUserProfile}
                    decorator={
                      <Ionicons name="person" style={styles.buttonIcon} />
                    }
                  />
                </>
              )}
              <Button
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
          </SafeAreaView>
        </View>
      </Pressable>
    </Modal>
  );
}

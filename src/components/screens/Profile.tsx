import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, Linking, SafeAreaView, Text, View } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { Profile, useViewModel } from '../../model/ViewModel';
import { supabase } from '../../lib/supabase';
import { styles } from '../../theme/theme';
import Loading from '../common/Loading';
import Button from '../common/Button';

const Avatar = require('../../../assets/avatar.png');

export default function ProfileScreen() {
  const { selectedUser, user } = useViewModel();
  const { navigate } = useNavigation<any>();
  const [profile, setProfile] = useState<null | Profile>(null);

  useEffect(() => {
    const getProfile = async () => {
      let { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', selectedUser.id)
        .single();
      if (error) alert(error.message);
      else setProfile(data);
    };
    getProfile();
  }, []);

  if (!profile) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{ gap: 20 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Image
              source={profile.avatar_url ? { uri: profile.avatar_url } : Avatar}
              style={{ width: 160, height: 160, borderRadius: 10 }}
            />
            <View style={{ justifyContent: 'space-around' }}>
              <Text style={styles.title}>{profile.full_name}</Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Ionicons name="location-outline" size={24} color="black" />
                <Text>{profile.location}</Text>
              </View>
              {profile.website ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Ionicons name="link-outline" size={24} color="black" />
                  <Text
                    style={styles.link}
                    onPress={() => Linking.openURL(profile.website)}>
                    {profile.website.replace(/^https?:\/\//i, '')}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <Text>{profile.bio}</Text>
        </View>
        {profile.id === user.id ? (
          <Button
            onPress={() => navigate('Edit Profile', { profile, setProfile })}
            title="Edit Profile"
            decorator={<FontAwesome5 name="edit" style={styles.buttonIcon} />}
          />
        ) : (
          <Button
            onPress={() => navigate('Chat')}
            title={`Send Message to ${profile.full_name}`}
            decorator={
              <Ionicons name="chatbubbles" style={styles.buttonIcon} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

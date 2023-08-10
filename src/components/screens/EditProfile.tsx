import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { supabase } from '../../lib/supabase';
import { styles } from '../../theme/theme';
import Button from '../common/Button';

const Avatar = require('../../../assets/avatar.png');

export default function EditProfile({
  route: {
    params: { profile },
  },
}: any) {
  const { navigate } = useNavigation<any>();
  const [fullName, setFullName] = useState(profile.full_name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
  const [website, setWebsite] = useState(profile.website || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [location, setLocation] = useState(profile.location);
  const [loading, setLoading] = useState(false);

  async function updateProfile() {
    setLoading(true);

    const update = {
      id: profile.id,
      full_name: fullName,
      avatar_url: avatarUrl,
      website: website,
      bio: bio,
      location: location,
    };

    const { error } = await supabase.from('profiles').upsert(update);

    setLoading(false);
    if (error) alert(error.message);
    else navigate('Profile');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          padding: 20,
          gap: 15,
        }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity disabled>
            <Image
              source={avatarUrl ? { uri: avatarUrl } : Avatar}
              style={{ width: 110, height: 110, borderRadius: 10 }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.textInput, styles.formInput]}
          placeholder="Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}>
          <Ionicons name="location-outline" size={24} color="black" />
          <TextInput
            style={[styles.textInput, styles.formInput, { flex: 1 }]}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="link-outline" size={24} color="black" />
          <TextInput
            style={[styles.textInput, styles.formInput, { flex: 1 }]}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
          />
        </View>
        <TextInput
          style={[styles.textInput, styles.formInput]}
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 20, padding: 20 }}>
        <View style={{ flex: 1 }}>
          <Button
            loading={loading}
            title="Cancel"
            onPress={() => navigate('Profile')}
            variant="outlined"
            decorator={
              <FontAwesome
                name="close"
                style={[styles.buttonIcon, styles.buttonOutlinedText]}
              />
            }
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            loading={loading}
            title="Save Changes"
            onPress={updateProfile}
            decorator={<FontAwesome name="check" style={styles.buttonIcon} />}
            disabled={!fullName || !location}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

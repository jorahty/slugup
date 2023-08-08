import { useState } from 'react';
import { Text, View } from 'react-native';

import { supabase } from '../../lib/supabase';

export default function EditProfile({
  route: {
    params: { profile },
  },
}: any) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);
  const [website, setWebsite] = useState(profile.website);
  const [bio, setBio] = useState(profile.bio);
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

    if (error) alert(error.message);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile</Text>
      <Text>{profile.full_name}</Text>
    </View>
  );
}

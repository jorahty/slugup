import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useViewModel } from '../../model/ViewModel';
import { supabase } from '../../lib/supabase';

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  location: string;
  website: string;
  bio: string;
}

export default function Profile() {
  const { selectedUser } = useViewModel();
  const [profile, setProfile] = useState<null | Profile>(null);

  useEffect(() => {
    const getProfile = async () => {
      let { data, error } = await supabase
        .from('profiles')
        .select(`location, website, bio`)
        .eq('id', selectedUser.id)
        .single();
      if (error) alert(error.message);
      else setProfile({ ...selectedUser, ...data });
    };
    getProfile();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{JSON.stringify(profile)}</Text>
    </View>
  );
}

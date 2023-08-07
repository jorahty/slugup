import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
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

const ViewModelContext = createContext<any>({});

export const useViewModel = () => useContext(ViewModelContext);

export default function ViewModel({ children }: { children: ReactNode }) {
  const [selectedPost, setSelectedPost] = useState<null | Post>(null);
  const [selectedUser, setSelectedUser] = useState<null | User>(null);

  return (
    <ViewModelContext.Provider
      value={{ selectedPost, setSelectedPost, selectedUser, setSelectedUser }}>
      {children}
    </ViewModelContext.Provider>
  );
}

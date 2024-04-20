import Auth from '../components/Auth';
import Chat from '../components/Chat';
import supabase from '../utils/supabaseClient';

export default function Home() {
  const user = supabase.auth.user();

  return (
    <div>
      {!user ? (
        <Auth />
      ) : (
        <Chat />
      )}
    </div>
  );
}

import { useState } from 'react';
import supabase from '../utils/supabaseClient';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) console.error('Login error:', error.message);
    setLoading(false);
  }

  async function handleSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error('Signup error:', error.message);
    setLoading(false);
  }

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup} disabled={loading}>Sign Up</button>
      <button onClick={handleLogin} disabled={loading}>Log In</button>
    </div>
  );
}

export default Auth;

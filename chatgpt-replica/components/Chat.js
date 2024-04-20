import { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    let { data: messages, error } = await supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: false });

    if (!error) {
      setMessages(messages);
    } else {
      console.error('Error fetching messages:', error);
    }
  }

  async function sendMessage() {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ text: input, user_id: supabase.auth.user().id }])
      .single();

    if (!error) {
      setMessages([...messages, data]);
      setInput('');
    } else {
      console.error('Error sending message:', error);
    }
  }

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

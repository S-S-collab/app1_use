import { useState, useEffect } from 'react';
import Tweet from './Tweet';

export const HomePage = () => {
  const [thoughts, setThoughts] = useState("");
  const [newThought, setNewThought] = useState("");

  useEffect(() => {
    const thoughts = [
      { id: 1, text: 'Hello, world!', username: 'john' },
      { id: 2, text: 'This is my second thought!', username: 'jane' },
      { id: 3, text: 'I love React!', username: 'bob' },
    ];
    setThoughts(thoughts);
  }, []);

  const handleNewThought = (e) => {
    setNewThought(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThoughtObj = { id: thoughts.length + 1, text: newThought, username: 'Your Username' };
    setThoughts([...thoughts, newThoughtObj]);
    setNewThought('');
  };

  return (
    <div className="home-page">
      <header>
        <h1>Strangers world</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newThought}
            onChange={handleNewThought}
            placeholder="What's happening?"
          />
          <button type="submit">Thoughts</button>
        </form>
        <ul>
          {tweets.map((thought) => (
            <Tweet key={thought.id} tweet={thought} />
          ))}
        </ul>
      </main>
    </div>
  );
}

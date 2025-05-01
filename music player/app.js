const { useState, useRef, useEffect } = React;

const songs = [
  { name: "Killshot", file: "Killshot.mp3" },
  { name: "Die With A Smile", file: "DieWithAsmile.mp3" },
  { name: "Line without A Hook", file: "LinewithoutAhook.mp3" }
];

function SongList({ songs, currentSong, onSelect }) {
  return (
    <ul className="song-list">
      {songs.map((song, index) => (
        <li
          key={index}
          className={currentSong?.name === song.name ? "active" : ""}
          onClick={() => onSelect(song)}
        >
          {song.name}
        </li>
      ))}
    </ul>
  );
}

function Player({ song }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [song]);

  return (
    <div className="player">
      <p>{song ? `Now Playing: ${song.name}` : "Select a song to play"}</p>
      <audio ref={audioRef} controls>
        <source src={song?.file} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

function App() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className="app-container">
      <h1>🎵 React Music</h1>
      <SongList songs={songs} currentSong={currentSong} onSelect={setCurrentSong} />
      <Player song={currentSong} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

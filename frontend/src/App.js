import {useState} from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom';
function App() {
  
  const [input, setInput] = useState("")
  const navigate = useNavigate();  

  return (
    <div className="App">
      <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="fd"  />
      <button onClick={() => navigate(`/user/${input}`)}>Send</button>
    </div>
  );
}

export default App;

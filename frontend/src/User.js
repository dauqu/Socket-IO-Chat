import React, {useState} from 'react'

import socket from 'socket.io-client';
import { useParams } from 'react-router-dom';

const User = () => {

  const {id} = useParams();
  const [input, setInput] = useState("");
  const [to, setTo] = useState(2);
  const io = socket("ws://localhost:3000");
  const [message, setMessage]=useState([])

  const [users, setUsers] = useState([
    {
      id: 2,
    },{
      id: 3
    }, {
      id: 4
    }
  ]);
  // const clientId = Math.floor(Math.random() * 1000000000);

  io.on("connect", () => {
    io.emit("send-id", {id})


    io.on("receive-message", (data) => {
      console.log(data);
      setMessage([...message, data])
    })

  })
  

  //generate random client id


  const sendMessage = (e) => {
    e.preventDefault();
    io.emit("send-message", {from: id, to: to, message: input})
    setInput("")
  }

  return (
    <>
      {users.length > 0 && users.map((user) => (
        <>
          <h2 key={user.id} onClick={() => setTo(user.id)}>User Id: {user.id}</h2>
        </>
      ))}
      <div>{id}</div>
      {message.length > 0 && message.map((item, index) => (
        <div key={index}>
          <h5>From : {item.from}</h5>
          <h5>To : {item.to}</h5>
          <h5>Message : {item.message}</h5>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='send message' />
        <input type="submit" value="send" />
      </form>
    </>
  )
}

export default User
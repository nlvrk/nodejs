import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    const obj = {
      roomId,
      userName,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Ваша Группа"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button variant="contained" color="secondary" disabled={isLoading} onClick={onEnter} className="btn btn-success">
      {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
      </Button>
      
    </div>
  );
}

export default JoinBlock;

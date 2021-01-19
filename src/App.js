
import axios from 'axios';
import socket from './socket';
import reducer from './reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import { AppBar, Container, Toolbar, Typography, Paper, IconButton, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import React from 'react';





const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1
  },
  mainFeaturesPost: {
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "550px"

  },
  mainFeaturesPostContent: {
    position: 'relative',
    paddingTop: theme.spacing(6),
    paddingRight: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingTBottom: theme.spacing(2),
    marginTop: theme.spacing(9),
  },
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.7)"
  },
  forma:{
    marginRight: "auto",
    marginLeft: "auto",
    align: "center",
    width: "100%",
    marginTop: "50px"
  },
  mainButtons:{

  },


}))



function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const classes = useStyles();

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <>
        <AppBar position="fixed">
          <Container fixed>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                <EmojiPeopleIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>Выпускники</Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <main>

          <Paper className={classes.mainFeaturesPost} 
          style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/02/07/10/33/crowd-2045499_1280.jpg)'}}>
            <Container fixed>
              <div className={classes.overlay}></div>
              <Grid container>
                <Grid item md={6} >
                  <div className={classes.mainFeaturesPostContent}>
                    <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom>
                      Веб-чат для выпускников
                    </Typography>
                    <Typography
                    variant="h5"
                    color="inherit"
                    paragraph>
                      В этом чате вы можете пообщаться со своими одногруппниками.
                       Для этого нужен только номер группы в которой вы учились
                    </Typography>
                        <Button variant="contained" color="secondary" href="#bot" >К чату</Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Paper>
          <div className={classes.mainContent}>
            <Container maxWidth="sm">
              <Grid Container>
                  <Grid item md={12}>
              <Typography variant="h2" align="center" color="textPrimary" gutterBottom>Поздравь ОмГТУ!</Typography>
              <Typography variant="h5" align="center" color="textSecondary" gutterBottom>Здесь вы можете написать своё поздравление</Typography>
              <form className={classes.forma} noValidate autoComplete="off">
                <textarea  style={{width: "100%"}}></textarea>
                <Grid item>
                <Button variant="contained" color="secondary" type="submit" style={{marginLeft: "40%"}} >Отправить</Button>
                </Grid>
                </form>
                <Typography style={{marginTop: '150px'}} variant="h2" align="center" color="textPrimary">Веб-чат</Typography> 
                  </Grid>
                </Grid>
            </Container>
          </div>
        </main>
        
    
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
        <footer>
          <a id="bot" />
          <Typography align="center" color="textSecondary" component="p" variaant="subtitle" gutterBottom>© 2021 All Right Reserved</Typography>
        </footer>
    </>
  );
}

export default App;


import { AppBar, Container, Toolbar, Typography, Paper, IconButton, Box } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
root: {
    flexGrow: 1
},
menuButton: {
    marginRight: theme.spacing(1)
},
title: {
    flexGrow: 1
}
}))
export default class Comp extends Component {
    render() {

        const classes = useStyles();

        return (
            <>
            <AppBar>
                <Container fixed>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>Students Chat</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        
        <main>
            <Paper style={{backgroundImage: 'url(https://source.unsplash.com/random)'}}>
    
            </Paper>
        </main>
        
        </>
        )
    }
}

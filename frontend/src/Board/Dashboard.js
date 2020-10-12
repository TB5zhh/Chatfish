import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { userList, useSecondaryListItems } from './Drawer/Drawerlist'
import Switch from '@material-ui/core/Switch'
import Avatar from '@material-ui/core/Avatar'
import { Grid, Menu, MenuItem } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Chatroom from './Chatroom/Chatroom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://gitlab.secoder.net/GoJellyfish/ChatFish"
      >
        FishChat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarIcon: {
    padding: 5
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'hidden'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  box: {
    padding: theme.spacing(4),
    minWidth: 300 // fixme: not working!
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  listStyles: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function Dashboard() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [anchorMenu, setAnchorMenu] = React.useState(null)
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault()
    history.push('/')
  }
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleAvatarClick = (event) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorMenu(null)
  }
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar id="toolbar" className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Chat Fish
          </Typography>

          <div>
            <Switch
              name="checkedA"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
          <div className={classes.appBarIcon}>
            <IconButton color="inherit">
              {/* number of notification */}
              <Badge badgeContent={'12'} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>

          <div className={classes.appBarIcon}>
            {/* user icon */}
            <IconButton onClick={handleAvatarClick}>
              <Avatar>S</Avatar>
            </IconButton>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorMenu}
            keepMounted
            open={Boolean(anchorMenu)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listStyles}>{userList}</List>
        <Divider />
        <List>{useSecondaryListItems()}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Grid container direction="row" justify="center"> */}
        {/* <Grid item xl={1}>
            <Container maxWidth="lg" className={classes.container}>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </Grid> */}
        {/* <Grid item > */}
        {/* <Container maxWidth="xl" className={classes.container}>
          {Chatroom()}
        </Container> */}
        <Box display="flex" flexDirection="row" justifyContent="center">
          {/* <Box className={classes.box}>{Chatroom()}</Box> */}
          <Box className={classes.box}>{Chatroom()}</Box>
        </Box>
        {/* </Grid> */}
        {/* </Grid> */}
      </main>
    </div>
  )
}

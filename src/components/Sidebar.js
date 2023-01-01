import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import sidebar from "./Sidebar.module.css"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';



const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    height: '90px',
}));

export default function PersistentDrawerLeft({ components }) {
    const [cookies, setCookie] = useCookies(['accessToken']);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const validateAccessToken = async () => {
            try {
                const url = 'https://gosky.up.railway.app/api/auth/whoami';
                const rawResponse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.accessToken,
                    },
                })
                const response = await rawResponse.json();
                if (response.status !== 'success') {
                    throw new Error();
                } else {
                    setUser(response.data);
                }
            } catch (error) {
                setCookie('accessToken', '', { path: '/' });
                navigate('/login');
            }
        }

        if (cookies.accessToken === '') {
            navigate('/login');
        } else {
            validateAccessToken();
        }
    }, [])

    return (
        <Box sx={{ display: 'flex', boxSizing:'none', marginTop: '-25px'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ background: '#FFFFFF' }}>
                <Container maxWidth='100%'>
                    <Grid container spacing={2} justifyContent='space-between'>
                        <Grid item>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                                >
                                    <MenuIcon sx={{ color: "dodgerblue" }} />
                                </IconButton>
                                <img src="/img/Group4.png" width={140} height={40} alt="" className={sidebar.logo}/>
                            </Toolbar>
                        </Grid>
                        <Grid item >
                            <Toolbar>
                                <img src={user.imageUrl} width={35} height={35} alt=""/>
                                <Typography
                                    sx={{
                                        fontFamily: 'Montserrat',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        color: '#484848',
                                        marginLeft:'10px'
                                    }}
                                >{user.name}</Typography>
                            </Toolbar>
                        </Grid>
                    </Grid>
                </Container>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#00ACED;',
                        paddingLeft: '15px',
                        paddingRight: '15px'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ paddingRight: '0px', maxHeight:'14px', marginTop:'15px'}}>
                    <Typography
                        sx={{
                            marginLeft: '10px',
                            fontFamily: 'Montserrat',
                            fontStyle: 'normal',
                            fontWeight: '700',
                            fontSize: '30px',
                            lineHeight: '44px',
                            color: '#FFFFFF',
                            margin:'0px',
                        }}
                    >GoSky Admin</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <CloseIcon sx={{ color: "white" }} /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <hr sx={{margin:'0px'}}></hr>
                <Divider />
                <List sx={{ marginTop: '15%', }}>
                    {
                        [{"name":'Dashboard', 'link':'/dashboard'}, {"name":'Manage Tickets', 'link':'/dashboard/tickets'}, {"name":'Logout', 'link':'/logout'}].map((text, index) => (
                            <ListItem key={text.name} disablePadding >
                                <a  href={text.link} style={{textDecoration:'none'}}>
                                <ListItemButton sx={{ height: '90px', width: '300px' }}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        {index / 2 === 0 ? <DashboardCustomizeRoundedIcon sx={{ fontSize: '45px' }} /> : (index % 2 === 1 ? <AirplaneTicketRoundedIcon sx={{ fontSize: '45px' }} /> : <LogoutRoundedIcon sx={{ fontSize: '45px' }} />)}
                                    </ListItemIcon>
                                    <ListItemText>
                                        <p style={{
                                            fontFamily: 'Montserrat',
                                            fontStyle: 'normal',
                                            fontWeight: '700',
                                            fontSize: '24px',
                                            lineHeight: '37px',
                                            color: '#FFFFFF',
                                            
                                        }}>{text.name}</p>
                                    </ListItemText>
                                </ListItemButton>
                                </a>
                            </ListItem>
                        ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open} sx={{ backgroundColor:'#F1F1F1'}}>
                <DrawerHeader />
                {components}
            </Main>
        </Box>
    );
}

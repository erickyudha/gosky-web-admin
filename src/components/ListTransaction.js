
import * as React from 'react';
import { Typography } from "@mui/material"
import { Grid } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./ListTransaction.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import { useState } from 'react';
import '../pages/TicketDashboard.css';


export default function ListTransactions() {
    const headerTable = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '29px',
        color: '#000000',
    }

    const rowTable = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '14px',

        color: '#000000',
    }

    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookie] = useCookies(['accessToken']);
    const [transaction, setTransaction] = React.useState([{
        "id": '-',
        "userId": '-',
        "ticketId": '-',
        "amount": '-',
        "bookingCode": '-',
        "deletedAt": '-',
        "createdAt": '-',
        "updatedAt": '-',
        "ticket": {
            "category": "-",
            "from": "-",
            "to": "-",
            "departureTime": "-",
            "price": '-',
            "flightNumber": '-',
        },
        "user": {
            "id": '-',
            "name": '-',
            "role": '-',
            "imageUrl": '-'
        }
    }
    ]);
    const [earning, setEarning] = React.useState({
        "today": {
            "earnings": '-',
            "count": '-',
        },
        "thisMonth": {
            "earnings": '-',
            "count": '-',
        },
        "thisYear": {
            "earnings": '-',
            "count": '-',
        }
    });
    const navigate = useNavigate();


    React.useEffect(() => {
        document.title = 'Dashboard - GoSky Admin';
        const validateAccessToken = async () => {
            try {
                setIsLoading(true);
                const url = 'https://gosky.up.railway.app/api/transactions';
                const rawResponse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.accessToken,
                    },
                });
                const response = await rawResponse.json();
                if (response.status !== 'success') {
                    throw new Error();
                } else {

                    setTransaction(response.data);
                }

                const urlEarning = 'https://gosky.up.railway.app/api/earnings';
                const rawResponseEarning = await fetch(urlEarning, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + cookies.accessToken,
                    },
                });
                const responseEarning = await rawResponseEarning.json();
                if (responseEarning.status !== 'success') {
                    throw new Error();
                } else {
                    setEarning(responseEarning.data);
                    setIsLoading(false);
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

    function createData(id, user, ticket, amount, totalPrice, transactionTime) {
        return { id, user, ticket, amount, totalPrice, transactionTime };
    }
    const rows = [];

    transaction.map((transactions) => {
        if (!transactions.ticket) {
            transactions.ticket = {
                "category": "-",
                "from": "-",
                "to": "-",
                "departureTime": "-",
                "price": '-',
                "flightNumber": '-',
            }
        }
        return rows.push(createData(
            transactions.id, transactions.user.name, 
            `[${transactions.ticket.category}] ${transactions.ticket.from} - ${transactions.ticket.to} (${transactions.ticket.flightNumber})`,
            transactions.amount,
            new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transactions.ticket.price * transactions.amount),
            new Date(transactions.updatedAt).toLocaleString()))
    });

    let sort = rows.reverse();

    const limit = [];
    for (let index = 0; index < 11; index++) {
        if (sort[index] !== undefined) {
            limit.push(sort[index]);
        } else {
            limit.push(createData(index, '', '', '', '', ''))
        }
    }


    return (

        <div className='ticket-db-main'>
            <h1>Dashboard</h1>
            <Grid container spacing={2} justifyContent='start' sx={{
                '@media screen and (max-width:1454px)': {
                    justifyContent: 'center',
                }
            }}>
                <Grid item >
                    <div className="retangle">
                        <p className="retangleTitle" style={{ color: '#0E4DA4' }}>Earnings (Today)</p>
                        <Grid container spacing={2} justifyContent='start'>
                            <Grid item xs={3}>
                                <img src="/img/money.png" height={35} width={60} style={{ marginTop: '15px' }} alt=''></img>
                            </Grid>
                            <Grid item xs={9}>
                                <p className="content1">{earning.today.count} Transactions</p>
                                <p className="content2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(earning.today.earnings)}</p>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item >
                    <div className="retangle">
                        <p className="retangleTitle" style={{ color: '#0084B4' }}>Earnings (This Month)</p>
                        <Grid container spacing={2} justifyContent='start'>
                            <Grid item xs={3}>
                                <img src="/img/calender.png" height={50} width={50} alt=''></img>
                            </Grid>
                            <Grid item xs={9}>
                                <p className="content1">{earning.thisMonth.count} Transactions</p>
                                <p className="content2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(earning.thisMonth.earnings)}</p>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item >
                    <div className="retangle">
                        <p className="retangleTitle" style={{ color: '#0FA958' }}>Earnings (This Year)</p>
                        <Grid container spacing={0} justifyContent='start'>
                            <Grid item xs={3}>
                                <img src="/img/tumpukan.png" height={50} width={50} style={{ marginTop: '5px' }} alt=''></img>
                            </Grid>
                            <Grid item xs={9}>
                                <p className="content1">{earning.thisYear.count} Transactions</p>
                                <p className="content2">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(earning.thisYear.earnings)}</p>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <div className="backgroundTable">
                <p className="tableTitle">Last Transactions</p>
                <TableContainer component={Paper} sx={{ marginBottom: '10px' }}>
                    <Table aria-label="a dense table">
                        <TableHead className="headerTable">
                            <TableRow >
                                <TableCell sx={headerTable}>User</TableCell>
                                <TableCell sx={headerTable} >Ticket</TableCell>
                                <TableCell sx={headerTable} >Amount</TableCell>
                                <TableCell sx={headerTable} >Total Price</TableCell>
                                <TableCell sx={headerTable} >Transaction Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {limit.map((row, i) => (
                                <TableRow key={i} sx={{ height: '0px', }}>
                                    <TableCell component="th" scope="row" className="headerTableRow" sx={{ border: 'none',  paddingTop:'8px', paddingBottom:'8px'}}>
                                        <Typography sx={rowTable}>{row.user}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', background: 'rgba(161, 14, 164, 0.08)', paddingTop:'8px', paddingBottom:'8px'}}><Typography sx={rowTable}>{row.ticket}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none', paddingTop:'8px', paddingBottom:'8px' }}><Typography sx={rowTable}>{row.amount}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none', background: 'rgba(161, 14, 164, 0.08)', paddingTop:'8px', paddingBottom:'8px' }}><Typography sx={rowTable}>{row.totalPrice}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none', paddingTop:'8px', paddingBottom:'8px' }}><Typography sx={rowTable}>{row.transactionTime}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <a className="linkk" href='/dashboard/transactions'>View more {">>"}</a>
            </div><br/>
            <LoadingScreen active={isLoading} />
        </div>
    )
}

import * as React from 'react';
import {Typography } from "@mui/material"
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
import '../pages/TicketDashboard.css';
import LoadingScreen from '../components/LoadingScreen';
import { useState } from 'react';

export default function ListTransactions() {
    const headerTable = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '29px',
        color: '#000000',
    }

    const rowTable = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '17px',
        lineHeight: '20px',
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
            "price": '-',
        },
        "user": {
            "id": '-',
            "name": '-',
            "role": '-',
            "imageUrl": '-'
        }
    }]);
    const navigate = useNavigate();


    React.useEffect(() => {
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
                "price": '-',
            }
        }
        return rows.push(createData(
            transactions.id, transactions.user.name, `[${transactions.ticket.category}] ${transactions.ticket.from} - ${transactions.ticket.to}`,
            transactions.amount,
            new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transactions.ticket.price*transactions.amount), 
            new Date(transactions.updatedAt).toLocaleString()))
    });

    let sort = rows.reverse();
    console.log(sort);

    const limit = [];
    let batas = 17;
    if (sort.length >= 18) {
        batas = sort.length;
    }
    for (let index = 0; index < batas; index++) {
        if (sort[index] !== undefined) {
            limit.push(sort[index]);
        } else {
            limit.push(createData(index, '', '', '', '', ''))
        }
    }

    return (
        <div className='ticket-db-main' style={{marginTop: '-10px'}}>  
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
                            {limit.map((row) => (
                                <TableRow key={row.id} sx={{ height: '0px' }}>
                                    <TableCell component="th" scope="row" className="headerTableRow" sx={{ border: 'none', }}>
                                        <Typography sx={rowTable}>{row.user}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', background: 'rgba(161, 14, 164, 0.08)' }}><Typography sx={rowTable}>{row.ticket}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none' }}><Typography sx={rowTable}>{row.amount}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none', background: 'rgba(161, 14, 164, 0.08)' }}><Typography sx={rowTable}>{row.totalPrice}</Typography></TableCell>
                                    <TableCell sx={{ border: 'none' }}><Typography sx={rowTable}>{row.transactionTime}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/><br/>
            </div>
            <LoadingScreen active={isLoading} />
            <br/><br/><br/>
        </div>
    )
}
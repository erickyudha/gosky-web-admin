import { Typography, Container } from "@mui/material"
import "./ListTransaction.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(user, ticket, amount, totalPrice, transactionTime) {
    return { user, ticket, amount, totalPrice, transactionTime };
  }
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
const limit = [];
for (let index = 0; index < 11; index++) {
    if (rows[index]===undefined){
        limit.push(' ')
    }else{
        limit.push(rows[index]);
    }
    
}
export default function ListTransactions() {
    const headerTable = {
        fontFamily: 'Montserrat',
        fontStyle:'normal',
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '29px',
        color: '#000000',
    }
    
    const rowTable = {
        fontFamily: 'Montserrat',
        fontStyle:'normal',
        fontWeight: '700',
        fontSize: '19px',
        lineHeight: '23px',
        color: '#000000',
    }
    return (
        <Container maxWidth>
            <div className="backgroundTable">
                <p className="tableTitle">Last Transactions</p>
                <TableContainer component={Paper} sx={{marginBottom:'10px'}}>
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
                                <TableRow key={row.user}>
                                    <TableCell component="th" scope="row" className="headerTableRow" sx={{border:'none', height: '50px'}}>
                                    <Typography sx={rowTable}>{row.user}</Typography>
                                    </TableCell>
                                    <TableCell sx={{border:'none', background: 'rgba(161, 14, 164, 0.08)'}}><Typography sx={rowTable}>{row.ticket}</Typography></TableCell>
                                    <TableCell sx={{border:'none'}}><Typography sx={rowTable}>{row.amount}</Typography></TableCell>
                                    <TableCell sx={{border:'none', background: 'rgba(161, 14, 164, 0.08)'}}><Typography sx={rowTable}>{row.totalPrice}</Typography></TableCell>
                                    <TableCell sx={{border:'none'}}><Typography sx={rowTable}>{row.transactionTime}</Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br/><br/>
            </div>
        </Container>
    )
}
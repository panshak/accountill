import React, {useState } from 'react';
import { useDispatch } from 'react-redux'
import styles from './Clients.module.css'
// import moment from 'moment'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Container from '@material-ui/core/Container'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'react-simple-snackbar'

import { deleteClient } from '../../actions/clientActions';
// import clients from '../../clients.json'

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),

  },
}));

function TablePaginationActions(props) {

  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



const useStyles2 = makeStyles(theme => ({
  table: {
    minWidth: 500,
  },

  tablecell: {
    fontSize: '16px'
}
}));


const Clients = ({ setOpen, setCurrentId, clients }) => {
    
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(clients.length);
      // eslint-disable-next-line 
      const [openSnackbar, closeSnackbar] = useSnackbar()

  const dispatch = useDispatch()
  const rows = clients
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleEdit = (selectedInvoice) => {
    
    setOpen((prevState) => !prevState)
    setCurrentId(selectedInvoice)

  }


  const tableStyle = { width: 160, fontSize: 14, cursor: 'pointer', borderBottom: 'none',  padding: '8px', textAlign: 'center' }
const headerStyle = { borderBottom: 'none', textAlign: 'center'}


  return (
    <div className={styles.pageLayout}>
    <Container style={{width: '85%'}}>
        <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <TableCell style={{...headerStyle, width: '10px'}}>Number</TableCell>
            <TableCell style={headerStyle}>Name</TableCell>
            <TableCell style={headerStyle}>Email</TableCell>
            <TableCell style={headerStyle}>Phone</TableCell>
            <TableCell style={headerStyle}>Edit</TableCell>
            <TableCell style={headerStyle}>Delete</TableCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => (
            <TableRow key={row._id} styel={{cursor: 'pointer'}} >
              <TableCell style={{...tableStyle, width: '10px'}}>{index + 1}</TableCell>
              <TableCell  style={tableStyle} scope="row" > <Button style={{textTransform: 'none'}}  > {row.name} </Button></TableCell>
              <TableCell style={tableStyle}>{row.email}</TableCell>
              <TableCell style={tableStyle}>{row.phone}</TableCell>
              <TableCell style={{...tableStyle, width: '10px'}}>
                  <IconButton onClick={() => handleEdit(row._id)}>
                    <BorderColorIcon style={{width: '20px', height: '20px'}} />
                  </IconButton>
              </TableCell>
              <TableCell style={{...tableStyle, width: '10px'}}>
                  <IconButton onClick={() => dispatch(deleteClient(row._id, openSnackbar))}>
                    <DeleteOutlineRoundedIcon style={{width: '20px', height: '20px'}} />
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Container>
    </div>
  );
}

export default Clients
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'item_name', label: 'Name', minWidth: 170 },
    { id: 'item_description', label: 'Description', minWidth: 100 },
    {
      id: 'item_size',
      label: 'Size',
      minWidth: 170,
      format: (value) => `${value}`
    },
    {
      id: 'item_cost',
      label: 'Cost',
      minWidth: 170,
    },
  ];


  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

const List = () => {
    const [scratchers, setScratchers] = useState([]); 
    const classes = useStyles();

    const baseURL = process.env.NODE_ENV === 'production' ? '/api/v1/backscratchers' : 'http://localhost:4000/api/v1/backscratchers';
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.create({baseURL}).get('/');
                setScratchers(response.data);
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []); 



    return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {scratchers && scratchers.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'object' ? `[${column.format(value)}]` : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    )
}

export default List

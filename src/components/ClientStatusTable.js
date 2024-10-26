import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const ClientStatusTable = ({ clients }) => {
  // Handle case when clients list is empty
  if (clients.length === 0) {
    return <Typography>No clients connected</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Client ID</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Last Communication</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map((client, index) => (
          <TableRow key={index}>
            <TableCell>{client.id}</TableCell>
            <TableCell>{client.status}</TableCell>
            <TableCell>{client.lastCommunication}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientStatusTable;

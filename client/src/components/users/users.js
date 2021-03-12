import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';


const usersList = props => (
   <List {...props}>
       <Datagrid rowClick="edit">
           <TextField source="username" />
           <TextField source="is_admin" />
           <EditButton  />
           <DeleteButton  />
       </Datagrid>
   </List>
);

export default usersList
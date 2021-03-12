import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const scratchersList = props => (
   <List {...props}>
       <Datagrid rowClick="edit">
           <TextField source="item_name" />
           <TextField source="item_description" />
           <TextField source="item_size" />
           <TextField source="item_cost" />
           <EditButton  />
           <DeleteButton  />
       </Datagrid>
   </List>
);

export default scratchersList
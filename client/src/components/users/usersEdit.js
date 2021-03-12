import React from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput, PasswordInput } from 'react-admin';

const scratchersEdit = (props) => {
    return (
        <Edit title='Edit User List' {...props}>
            <SimpleForm>
                <TextInput disabled source="id" /> 
                <TextInput source="username" />
                <PasswordInput source="password" />
                <BooleanInput label="is_admin" source="is_admin" />
            </SimpleForm>
        </Edit>
    )
}

export default scratchersEdit
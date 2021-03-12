import React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput,  BooleanInput } from 'react-admin';

const usersCreate = (props) => {
    return (
        <Create title='Create a User' {...props}>
            <SimpleForm>
                <TextInput source="username" />
                <PasswordInput source="password" />
                <BooleanInput label="is_admin" source="is_admin" />
            </SimpleForm>
        </Create>
    )
}

export default usersCreate
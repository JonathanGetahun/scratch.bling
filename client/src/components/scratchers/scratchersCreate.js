import React from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';

const scratchersCreate = (props) => {
    return (
        <Create title='Create a Post' {...props}>
            <SimpleForm>
                <TextInput source="item_name" />
                <TextInput source="item_description" />
                <ArrayInput source="item_size">
                    <SimpleFormIterator>
                        <TextInput source="" />
                    </SimpleFormIterator>
                </ArrayInput>                

                <TextInput source="item_cost" />
            </SimpleForm>
        </Create>
    )
}

export default scratchersCreate

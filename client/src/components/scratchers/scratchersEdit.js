import React from 'react';
import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';

const scratchersEdit = (props) => {
    return (
        <Edit title='Edit Scratcher List' {...props}>
            <SimpleForm>
                <TextInput disabled source="id" /> 
                <TextInput source="item_name" />
                <TextInput source="item_description" />
                <ArrayInput source="item_size">
                    <SimpleFormIterator>
                        <TextInput source="" />
                    </SimpleFormIterator>
                </ArrayInput>                

                <TextInput source="item_cost" />
            </SimpleForm>
        </Edit>
    )
}

export default scratchersEdit
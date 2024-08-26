import { gql } from '@apollo/client';

export const GET_EVENT = gql`
query {
    eventsItems{
        id 
        name
        isComplete
        
    }
}`;

export const GET_EVENT_BY_ID = gql`
query getEventById($id: Int!) {
    eventsItem(id: $id) {
        id
        name
        isComplete
    }
}`;
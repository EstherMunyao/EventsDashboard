import { gql } from "@apollo/client";

export const ADD_EVENTS = gql`
  mutation AddEventsItem($id: Int!, $name: String!, $isComplete: Boolean!) {
    addEventsItem(eventsItem: { id: $id, name: $name, isComplete: $isComplete }) {
      id
      name
      isComplete
    }
  }
`;


export const UPDATE_EVENTS = gql`
mutation updateEventsItem($id: Int!, $name: String!, $isComplete: Boolean!) {
    updateEventsItem( id: $id, isComplete: $isComplete , name:  $name ) {
        id
        name
        isComplete
    }
}` ;

export const DELETE_EVENTS = gql` 
mutation deleteEventsItem($id: Int!) {
    deleteEventsItem(id: $id){
    id
    name
    isComplete
    }
}`;
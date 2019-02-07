import update from 'immutability-helper'
import { TICKETS_REORDER, SET_MODE, UPDATE_TICKETS, UPDATE_COLUMNS } from '../actions/actionTypes'

 const defaultState = {
    tickets:{
      'ticket-1': {
            id:"ticket-1",
            summery: "Summery of ...",
            description: "some description of the ticket",
            status: "Open",
            severity:"Low"
          },
        'ticket-2': {
            id:"ticket-2",
            summery: "Summery of ...",
            description: "some description of the ticket",
            status: "Open",
            severity:"Medium"
          },
        'ticket-3': {
            id:"ticket-3",
            summery: "Summery of ...",
            description: "some description of the ticket",
            status: "Open",
            severity:"High"
          },
          'ticket-4': {
            id:"ticket-4",
            summery: "Summery of ...",
            description: "some description of the ticket 4",
            status: "In-Progress",
            severity:"Low"
          },
          'ticket-5': {
            id:"ticket-5",
            summery: "Summery of ...",
            description: "some description of the ticket",
            status: "Open",
            severity:"Low"
          },
          'ticket-6': {
            id:"ticket-6",
            summery: "Summery of ...",
            description: "some description of the ticket",
            status: "Done",
            severity:"Low"
          }
    },
    columns:{
      'column-1': {
        id:'column-1',
        title:'Open',
        ticketIds:["ticket-1", "ticket-2", "ticket-3", "ticket-5"]
      },
      'column-2': {
        id:'column-2',
        title:'In-Progress',
        ticketIds:["ticket-4"]
      },
      'column-3': {
        id:'column-3',
        title:'Done',
        ticketIds:["ticket-6"]
      }
    },
    columnOrder:["column-1", "column-2", "column-3"],
    newTicketsContainer:'column-1'
}
export default (state = defaultState, action) => {
  
  switch (action.type) {
    case TICKETS_REORDER:
      return update(state, {
        columns:{$set:action.columns}
      })
    case SET_MODE:
      return update(state, {
        selectedMode:{$set:action.mode}
      })
    case UPDATE_TICKETS:
      return update(state, {
        tickets:{$set:action.tickets}
      })
    case UPDATE_COLUMNS:
      return update(state, {
        columns:{$set:action.columns}
      })
    default:
      return state
  }
}
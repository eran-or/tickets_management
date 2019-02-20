import { TICKETS_REORDER, SET_MODE, UPDATE_TICKETS, UPDATE_COLUMNS } from './actionTypes'

export const ticketsReorder = (columns) => ({
    type: TICKETS_REORDER,
    columns
    //receivedAt: Date.now()
  })

export const setMode = (mode) => ({
    type: SET_MODE,
    mode
  })

export const updateTickets = (tickets) =>({
    type: UPDATE_TICKETS,
    tickets
  })

export const updateColumns = (columns) => ({
  type: UPDATE_COLUMNS,
  columns
})
// export const fetchBooks = () => {
//   console.log("eran");
  
//   const booksUrl = 'https://fakerestapi.azurewebsites.net/api/Books'
  
//   return dispatch => {
//     dispatch(requestWeather())
//     return fetch(booksUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(res => res.json())
//     .then(json => dispatch(receiveBooks(json)))
//     .catch(e => console.log(e))
//   }
// }
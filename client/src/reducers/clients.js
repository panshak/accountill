
import { ALL_CLIENTS, ADD_NEW_CLIENT, UPDATE_CLIENT, DELETE_CLIENT, FETCH_CLIENTS_BY_USER, FETCH_CLIENT, START_LOADING, END_LOADING } from '../actions/constants'

const clients = (state = { isLoading: true, clients: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true };
      case END_LOADING:
        return { ...state, isLoading: false };
      case ALL_CLIENTS:
        return {
          ...state,
          clients: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_CLIENTS_BY_USER:
        return { ...state, clients: action.payload };

      case FETCH_CLIENT:
        return { ...state, client: action.payload.client };
      case ADD_NEW_CLIENT:
        return { ...state, clients: [...state.clients, action.payload] };
      case UPDATE_CLIENT:
        return { ...state, clients: state.clients.map((client) => (client._id === action.payload._id ? action.payload : client)) };
      case DELETE_CLIENT:
        return { ...state, clients: state.clients.filter((client) => client._id !== action.payload) };
      default:
        return state;
    }
  };

  export default clients




//   const clients =(clients =[], action) => {
//     switch (action.type) {
//         case ALL_CLIENTS:
//             return action.payload

//         case FETCH_CLIENTS_BY_USER:
//             return action.payload

//         case ADD_NEW_CLIENT:
//             return [...clients, action.payload]

//         case UPDATE_CLIENT:
//             return clients.map((client) => client._id === action.payload ? action.payload : client)
        
//         case DELETE_CLIENT: 
//         return clients.filter((client) => client._id !== action.payload)
        
//         default:
//             return clients;
//     }
// }

// export default clients

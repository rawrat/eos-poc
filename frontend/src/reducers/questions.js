import EosConnector from '../EosConnector';

window.Questions = [];

const Questions = (state = [], action) => {
    console.log("action", action)  
    switch (action.type) {
      case 'GET_QUESTIONS':
        const data = [
          ...window.Questions
        ];
        console.log("data", data);
        return data
      default:
        return state
    }
  }
  export default Questions
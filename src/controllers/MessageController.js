import axios from 'axios';
import store from "../store/index.ts";

const MessageController = {

    sendMessage(message) {
        axios.post('http://127.0.0.1:46691/message/send', JSON.stringify(message), {withCredentials:false})
        .then(function(response){
        console.log(response.data);
        message.body = "";
        })
        .catch(error => {
            console.log(error)
        })
    },

    //Gets all of the info from an existing user
    getMessages(userID, targetID ,messages) {
        axios.get('http://127.0.0.1:46691/message/get/' + userID + "/" + targetID, {withCredentials:false})
        .then(function(response){
        hydrateMessages(messages, response.data);
        })
        .catch(error => {
            console.log(error)
        })
    },

    getHeaders(userID, messages){
        console.log("Axios starting...")
        axios.get('http://127.0.0.1:46691/message/header/' + userID, {withCredentials:false})
        .then(function(response){
        hydrateMessages(messages, response.data);
        })
        .catch(error => {
            console.log(error)
        })

    }

}

function hydrateMessages(messages, data){

    for(let keys in data){
        if(data[keys] != null) messages[keys] = data[keys]
    }
    return messages;

}

export default MessageController;
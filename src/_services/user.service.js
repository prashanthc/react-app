import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';
import { authenticationService } from './authentication.service';

export const userService = {
    getAll,
    getThreadsByUserId,
    createThread
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getThreadsByUserId() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const id =  user._id;
    return fetch(`${config.apiUrl}/users/threads/${id}`, requestOptions).then(handleResponse);
}

function createThread(thread) {   
    const user = authenticationService.currentUserValue;
    const userId =  user._id;
    thread['userId'] = userId
    const requestOptions = { 
        method: 'POST', 
        headers: new Headers({
            'Authorization': authHeader()['Authorization'],
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(thread)
    };
    return fetch(`${config.apiUrl}/users/thread`, requestOptions).then(handleResponse);
    
}
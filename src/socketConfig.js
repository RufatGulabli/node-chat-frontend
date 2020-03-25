import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:6600");

export default socket;
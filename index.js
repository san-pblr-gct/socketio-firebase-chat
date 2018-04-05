import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import admin from 'firebase-admin';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
io.liste
let port = process.env.PORT || 3000;
let users = [];

var serviceAccount = require('./demo-336c176e3094.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-6e1f6.firebaseio.com'
});

var db = admin.firestore();

io.origins('*:*');
io.on('connection', (socket) => {
    console.log("User connected");

    let sendStatus = (s) => {
        socket.emit('status', s);
    }

    // Get chats from firebase
    db.collection('chat').orderBy('timestamp', 'asc').get().then((docs) => {
        let res = [];
        docs.forEach((doc) => {
            res.push({ name: doc.data().name, message: doc.data().message })
        });
        //emit messages
        socket.emit('output', res);
    });

    // Handle input events
    socket.on('input', function (data) {
        let name = data.name;
        let message = data.message;

        // Check for name and message
        if (name == '' || message == '') {
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message

            db.collection('chat').doc().set({
                name: name,
                message: message,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                io.emit('output', [data]);
                sendStatus({
                    message: 'Message sent',
                    clear: true
                });
            });
        }
    });

    socket.on('clear', function (data) {
        var batch = db.batch();
        var query = db.collection('chat');
        query.get().then
        db.collection('chat').get().then((docs) => {
            docs.forEach((doc) => {
                doc.ref.delete().then(() => { console.log("deleted succesfully") }).catch((error) => { console.log(error) })
            });
            //emit messages
            io.emit('cleared');
        });

    });

    socket.on('disconnect', () => {
        console.log("User disconnected");
    });

})



server.listen(port, function () {
    console.log('listening on *:' + port);
});




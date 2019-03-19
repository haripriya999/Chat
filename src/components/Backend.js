import firebase from 'firebase';
class Backend
{
    uid=''
    messagesRef=null;
    constructor()
    {
        firebase.initializeApp({
            apiKey: "AIzaSyCqkZtsQnhJBinIhlO2ZhDO3ISjYc-ebYs",
            authDomain: "awesomeproject-302b7.firebaseapp.com",
            databaseURL: "https://awesomeproject-302b7.firebaseio.com",
            projectId: "awesomeproject-302b7",
            storageBucket: "awesomeproject-302b7.appspot.com",
            messagingSenderId: "544475127798"

        });
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setUid(user,uid);
            }
            else{
                firebase.auth().signInAnonymously().catch((error) => {
                    alert(error,message);
                });
            }
        });
    }
    setUid(value)
    {
        this.uid=value;
    }
    getUid()
    {
        return this.uid;
    }
    loadMessages(callback)
    {
        this.messagesRef=firebase.database().ref('messages');
        this.messagesRef.off();
        const onRecieve=(data)=>{const message=data.val();
        callback({
            _id:data.key,
            text:message.text,
            createdAt:newDate(message.createdAt),
            user:{
                _id: message.user._id,
                name: message.user.name,
            },
        });
        };
        this.messagesRef.limitToLast(20).on('child_added',onRecieve);

    }
    sendMessage(message)
    {
        for(let i=0;i<message.length;i++)
        {
         this.messagesRef.push({
          text: message[i].text,
          user: message[i].user,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
         });
        }
    }
    closeChat(){
        if(this.messagesRef)
        {
            this.messagesRef.off();
        }
    }
}

export default new Backend();

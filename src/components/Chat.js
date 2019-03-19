import React from 'react';
import {GiftedChat}from 'react-native-gifted-chat';
import Backend from '../Backend';
import { threadId } from 'worker_threads';
class Chat extends React.Component{
    state={
        messages:[],
    };
    componentWillMount(){

    }
    render()
{
    return(
     <GiftedChat messages={this.state.messages}
     onSend={(message)=>{
      Backend.sendMessage(message);
     } }
     user={{
         _id: Backend.getUid(),
         name: this.props.name,
     }} />
    );
}
componentDidMount(){
  Backend.loadMessages((message) =>{
      this.setState((previousState)=>{
          return{messages: GiftedChat.append(previousState.messges,message),
        };
      });
  });  
}
componentWillUnmount()
{
    Backend.closeChat();
}
}
Chat.defaultProps={
name:'Haripriya'
};
Chat.propTypes={
name: React.PropTypes.string,
};
export default Chat;
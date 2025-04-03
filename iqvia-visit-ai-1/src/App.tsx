import { useState, useEffect, useRef  } from 'react';

import React from 'react';
import cors from 'cors';
//import config from "./firebase/firebase";
import {getOpenAIResponse} from './openaiService'
import './app.css';
import { saveChatMessage } from "./chatService";
//import { queryDatabase, insertRecord} from "./db";

//const funtionUrl = 'https://www.google.com';
type Message = {
	content : string,
	role : 'ai' | 'user'
};

function App() {
	const [ newInputValue, setNewInputValue] = useState('');
	const [ messages, setMessages ] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const chatWindowRef = useRef(null);
	const [avatar, setAvatar] = useState(null);
	useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }	

    }, [messages, isLoading]);
	let isFirstMessage = true;
	const jsonBody = {
		action : 'Schedule/Reschedule/Cancel',
		date : '',
		start_time : '',
		end_time : '',
		patient_name : ''
	}
	const newMessage: React.FormEventHandler = async (e) =>{
		e.preventDefault();
		setNewInputValue('');
		setIsLoading(true); 
		const newMessages: Message[] = [...messages, {
			content : newInputValue,
			role: 'user',
		}]
		setMessages([...newMessages]);
		try{
			
			const response = await getOpenAIResponse([{	content : newInputValue + 'formatted in '+ JSON.stringify(jsonBody),
				role: 'user'
			}, {content : 'My available slots are only from 1 PM to 4PM', role: 'system'}]);	
			setMessages([...newMessages, {
				role : 'ai',			
				content : response.choices[0].message.content
			}]);
			

			isFirstMessage = false
		}
		catch(error){
			console.error('Error fetching response:'+error);
			setMessages([...newMessages, { role: 'ai', content: "Sorry, something went wrong." }]);
		}
		finally{
			setIsLoading(false); 
		}
	}

	const saveChat = () => {
		   saveChatMessage(messages, "user1");

	  }

	/*async function getUsers() {
		const users = await queryDatabase("SELECT * FROM Users");
		console.log(users);
	  }*/
	
	const avatarOptions = [
		{ id: 1, src: '/man.png', name: 'Avatar 1' },
		{ id: 2, src:  '/woman.png', name: 'Avatar 2' },
		{ id: 3, src:  '/user.png', name: 'Avatar 3' },
	  ];

	  const handleAvatarSelect = (avatar) => {
		setAvatar(avatar);
	  };
	
	return <main>
		<div className='main-div'>	
			<div className='header-div'>
				<h1>VisitBot.AI</h1>
			</div>			
			<div className='window-scroll' ref={chatWindowRef}>			
				<div className='chat-window body-div'>
					{isFirstMessage ? <p className='message ai'>Hi, I am VisitBot AI assistance. How may I assist you today! Select an avatar if you like!</p> : ''}
					
					{avatarOptions.map((option) => (
						<img
							key={option.id}
							src={option.src}
							alt={option.name}
							style={{ width: 50, height: 50, margin: 10 }}
							onClick={() => handleAvatarSelect(option)}
						/>
						))}
					{messages.map((message,index) => <p key={index} className={'message '+message.role}>
						{message.role == 'user'?  <img
							src={avatar.src}
							alt={avatar.name}
							style={{ width: 30, height: 30, marginRight: 10 }}
						/>: ''}
						{message.content}
					</p>)}
					
					{isLoading && <p className="typing-indicator"><span></span><span></span><span></span></p>}
				</div>
			</div>					
			<hr/>
			<div className='footer-div'>
				<form className='input-form' onSubmit={newMessage}>
					<input 	type='text' 
							className='input-box'
							placeholder='Type a message'
							value={newInputValue}
							onChange={e => setNewInputValue(e.currentTarget.value)}></input>
					<input type='submit' className='send-btn' value='Send'></input>
					<input type='button' className='send-btn' value='End Chat' onClick={saveChat}></input>
				</form>
			</div>			
		</div>
	</main>
}

export default App

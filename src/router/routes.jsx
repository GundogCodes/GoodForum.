import LoginPage from '../pages/LoginPage/LoginPage'
import UserPage from '../pages/UserPage/UserPage';
import HomePage from '../pages/HomePage/HomePage';
import ChatsPage from '../pages/ChatsPage/ChatsPage'

const routes = [	
	{
		Component: UserPage,
		key: 'You',
		path: '/user'
	},
	{
		Component: HomePage,
		key: 'Home',
		path: '/home'
	},
	{
		Component: ChatsPage,
		key: 'Chats',
		path: '/chats'
	}
]

export default routes
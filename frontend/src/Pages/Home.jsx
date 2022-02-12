import { Box } from '@mui/material';
import Posts from '../components/Posts';

const Home = ({ user }) => {
	return (
		<Box sx={{ padding: { lg: '0 300px' } }}>
			<Posts user={user} />
		</Box>
	);
};

export default Home;

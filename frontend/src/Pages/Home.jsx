import Posts from '../components/Posts';

const Home = ({ user }) => {
	return (
		<>
			<Posts user={user} />
		</>
	);
};

export default Home;

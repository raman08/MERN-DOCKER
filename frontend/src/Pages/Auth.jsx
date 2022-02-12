import { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Paper } from '@mui/material';
import Login from '../components/Form';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index }) {
	return <>{value === index && <Box>{children}</Box>}</>;
}

const BasicTabs = ({ user, isAuth, setIsAuth }) => {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (isAuth) {
	// 		navigate('/home');
	// 	}
	// }, []);

	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Paper elevation={20} sx={{ width: '500px', margin: '30px auto' }}>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
				centered
				sx={{ width: '100%' }}
				variant="fullWidth"
			>
				<Tab label="Login" />
				<Tab label="Register" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Login setIsAuth={setIsAuth} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Login register setIsAuth={setIsAuth} />
			</TabPanel>
		</Paper>
	);
};

export default BasicTabs;

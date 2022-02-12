import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, ButtonBase, Box } from '@mui/material';

const Header = ({ user, logoutHandler, isAuth }) => {
	const linkCss = { textDecoration: 'none', color: 'inherit' };

	let authPannel;

	if (isAuth) {
		authPannel = (
			<Box sx={{ display: 'flex' }}>
				<Link to={'/create'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Create
					</Typography>
				</Link>
				<ButtonBase onClick={logoutHandler} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Logout
					</Typography>
				</ButtonBase>
			</Box>
		);
	} else {
		authPannel = (
			<Link to={'/auth'} style={linkCss}>
				<Typography variant="h6" sx={{ m: 2 }}>
					Login
				</Typography>
			</Link>
		);
	}

	return (
		<AppBar position="sticky">
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Link to={'/home'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Home
					</Typography>
				</Link>
				{/* <Link to={'/profile'} style={linkCss}> */}
				{/* 	<Typography variant="h6" sx={{ m: 2 }}> */}
				{/* 		Profile */}
				{/* 	</Typography> */}
				{/* </Link> */}
				{authPannel}
			</Toolbar>
		</AppBar>
	);
};
export default Header;

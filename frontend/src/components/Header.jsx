import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Header = () => {
	const linkCss = { textDecoration: 'none', color: 'inherit' };
	return (
		<AppBar position="sticky">
			<Toolbar sx={{ justifyContent: 'center' }}>
				<Link to={'/'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Home
					</Typography>
				</Link>
				<Link to={'/profile'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Profile
					</Typography>
				</Link>
				<Link to={'/auth'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Login
					</Typography>
				</Link>
				<Link to={'/create'} style={linkCss}>
					<Typography variant="h6" sx={{ m: 2 }}>
						Create
					</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	);
};
export default Header;

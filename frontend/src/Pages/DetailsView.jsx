import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Delete, Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteContent, getSingleContent } from '../service/api';

const DetailsView = ({ isAuth, user }) => {
	const iconsCss = { float: 'right' };
	const iconCss = {
		margin: 1,
		border: '1px solid #878787',
		padding: 1,
		borderRadius: 2,
	};
	const bannerCss = { width: '100%', height: '40vh', objectFit: 'cover' };
	const titleCss = {
		fontSize: 38,
		fontWeight: 600,
		textAlign: 'center',
		margin: '50px 0 10px 0',
	};

	const navigate = useNavigate();
	const [content, setContent] = useState({});

	const { contentId } = useParams();

	useEffect(() => {
		console.log('UseEffectd Called');
		const getContent = async contentId => {
			const response = await getSingleContent(contentId);

			console.log(response, user);
			setContent(response.data);
		};

		getContent(contentId);
	}, [contentId]);

	const deleteHandler = async id => {
		await deleteContent(id);
		navigate('/home');
	};

	return (
		<Box sx={{ padding: { xd: '0px 10px', md: '0px 100px' } }}>
			<img
				src={
					content.image ||
					'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
				}
				alt="banner"
				style={bannerCss}
			/>

			{user.id === content.user && (
				<Box sx={iconsCss}>
					<Link
						href={`/edit/${contentId}`}
						style={{ textDecoration: 'none' }}
					>
						<Edit sx={iconCss} color={'primary'} />
					</Link>
					<Delete sx={iconCss} color={'error'} />
				</Box>
			)}
			<Typography sx={titleCss}>{content.title}</Typography>
			<Box
				sx={{
					color: '#878787',
					display: { md: 'flex' },
					margin: '20px 0',
					textAlign: 'center',
				}}
			>
				{/* <Typography>{content.user}</Typography> */}
				<Typography sx={{ marginLeft: 'auto' }}>
					{new Date(content.createdAt).toDateString()}
				</Typography>
			</Box>
			<Typography>{content.body}</Typography>
		</Box>
	);
};

export default DetailsView;

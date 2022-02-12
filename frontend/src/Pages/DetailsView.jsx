import { ButtonBase, Link, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Delete, Edit, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	deleteContent,
	getSingleContent,
	likeContent,
	unlikeContent,
} from '../service/api';

const DetailsView = ({ isAuth, user }) => {
	const iconsCss = { float: 'right', display: 'flex' };
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
	const [liked, setLiked] = useState(false);
	const [noOfLikes, setNoOfLikes] = useState(0);
	const { contentId } = useParams();

	useEffect(() => {
		console.log('UseEffectd Called');
		const getContent = async contentId => {
			const response = await getSingleContent(contentId);

			console.log(response, user);
			setContent(response.data);
			setNoOfLikes(response.data.likes.length);
			setLiked(response.data.liked);
		};

		getContent(contentId);
	}, [contentId]);

	const deleteHandler = async id => {
		await deleteContent(id);
		navigate('/home');
	};

	const likeHandler = async id => {
		await likeContent(id);
		setNoOfLikes(noOfLikes + 1);
		setLiked(true);
	};

	const unlikeHandler = async id => {
		await unlikeContent(id);
		setNoOfLikes(noOfLikes - 1);
		setLiked(false);
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
					<Tooltip title="Edit">
						<Link
							href={`/edit/${contentId}`}
							style={{ textDecoration: 'none' }}
						>
							<Edit sx={iconCss} color={'primary'} />
						</Link>
					</Tooltip>
					<Tooltip title="Delete">
						<ButtonBase onClick={() => deleteHandler(contentId)}>
							<Delete sx={iconCss} color={'error'} />
						</ButtonBase>
					</Tooltip>
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
				{!liked ? (
					<FavoriteBorder
						sx={{ marginRight: 1 }}
						onClick={() => likeHandler(contentId)}
					/>
				) : (
					<Favorite
						sx={{ marginRight: 1 }}
						onClick={() => unlikeHandler(contentId)}
					/>
				)}

				<Typography>{noOfLikes}</Typography>
				<Typography sx={{ marginLeft: 'auto' }}>
					{new Date(content.createdAt).toDateString()}
				</Typography>
			</Box>
			<Typography>{content.body}</Typography>
		</Box>
	);
};

export default DetailsView;

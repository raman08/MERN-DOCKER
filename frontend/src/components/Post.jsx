import { Box, Typography } from '@mui/material';

import { Favorite, FavoriteBorder } from '@mui/icons-material';

const Post = ({ content }) => {
	// const url = 'https://source.unsplash.com/random';
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				border: '1px solid',
				margin: 2,
				borderRadius: 5,
				fontFamily: 'Roboto',
				pb: 2,
				'&>*': {
					padding: '0 5px 5px 5px',
					mx: 2,
				},
			}}
		>
			<img
				src={content.image}
				alt="Wrapper"
				style={{
					height: '150px',
					width: '100%',
					objectFit: 'cover',
					borderRadius: '21px 21px 0 0',
				}}
			/>
			<Typography sx={{ fontSize: 12, color: '#878787' }}>
				{new Date(content.createdAt).toDateString()}
			</Typography>
			<Typography
				sx={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}
			>
				{content.title}
			</Typography>
			{/* <Typography sx={{ fontSize: 14, wordBreak: 'break-word' }}> */}
			{/* 	{content.body} */}
			{/* </Typography> */}
			<Box sx={{ display: 'flex', marginTop: 2 }}>
				{!content.liked ? (
					<FavoriteBorder sx={{ marginRight: 1 }} />
				) : (
					<Favorite sx={{ marginRight: 1 }} />
				)}

				<Typography sx={{ fontSize: 12, color: '#878787' }}>
					{content.likes.length}
				</Typography>
			</Box>
		</Box>
	);
};

export default Post;

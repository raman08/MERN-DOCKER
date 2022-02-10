import { Box } from '@mui/system';
import {
	Button,
	FormControl,
	InputBase,
	TextareaAutosize,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createContent, getSingleContent, editContent } from '../service/api';

const CreateView = ({ edit }) => {
	const bannerCss = { width: '100%', height: '40vh', objectFit: 'cover' };

	const navigate = useNavigate();
	const { contentId } = useParams();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const submitHandler = async () => {
		const data = { title: title, body: content, image: '' };
		if (edit) {
			await editContent(contentId, data);
			navigate(`/content/${contentId}`);
		} else {
			await createContent(data);
			navigate('/');
		}
	};

	useEffect(() => {
		const getContent = async contentId => {
			console.log('Use Effect: ', contentId);
			const response = await getSingleContent(contentId);

			setTitle(response.data.title);
			setContent(response.data.body);
		};

		getContent(contentId);
	}, [contentId]);

	return (
		<Box sx={{ padding: { xd: '0px 10px', md: '0px 100px' } }}>
			<img
				src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
				alt="banner"
				style={bannerCss}
			/>
			<FormControl sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
				<AddCircle fontSize="large" color="action" />

				<InputBase
					placeholder="Title"
					sx={{ flex: '1', margin: '0 30px', fontSize: 25 }}
					onChange={e => {
						setTitle(e.target.value);
						console.log(title);
					}}
					value={title}
				/>

				<Button
					variant="contained"
					color="primary"
					onClick={submitHandler}
				>
					{!edit ? 'Publish' : 'Update'}
				</Button>
			</FormControl>
			<TextareaAutosize
				minRows={5}
				placeholder="Enter the Content"
				style={{
					width: '100%',
					marginTop: 50,
					border: 'none',
					fontSize: 18,
					outline: 'none',
				}}
				onChange={e => {
					setContent(e.target.value);
					console.log(content);
				}}
				value={content}
			/>
		</Box>
	);
};

export default CreateView;

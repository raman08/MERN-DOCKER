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

import {
	createContent,
	getSingleContent,
	editContent,
	uploadFile,
} from '../service/api';

const CreateView = ({ edit, isAuth, user }) => {
	const bannerCss = { width: '100%', height: '40vh', objectFit: 'cover' };

	const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log('Called uSeeffect in createView', isAuth);
	// 	if (!isAuth) {
	// 		navigate('/auth');
	// 	}
	// }, [isAuth, navigate]);

	const { contentId } = useParams();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [file, setFile] = useState('');

	const [bannerImage, setBannerImage] = useState();

	const submitHandler = async () => {
		console.log('CreateView SubmitHandler Called');
		const data = { title: title, body: content, image: bannerUrl };
		if (edit) {
			await editContent(contentId, data);
			navigate(`/content/${contentId}`);
			return;
		} else {
			await createContent(data);
			navigate('/home');
			return;
		}
	};

	useEffect(() => {
		console.log('File Upload Create View api called');

		const getFile = async () => {
			if (file) {
				const data = new FormData();
				data.append('name', file.name);
				data.append('file', file);

				const res = await uploadFile(data);

				console.log(res);

				setBannerImage(res.image);
				return;
			}
		};

		getFile();
	}, [file]);

	useEffect(() => {
		console.log('CreateView Get Edit Data Content Called');

		if (!edit) {
			return;
		}

		const getContent = async contentId => {
			console.log('Use Effect: ', contentId);
			const response = await getSingleContent(contentId);

			setTitle(response.data.title);
			setContent(response.data.body);
			setBannerImage(response.data.image);
			console.log(response);
			return;
		};

		getContent(contentId);
	}, []);

	const bannerUrl = bannerImage
		? bannerImage
		: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

	return (
		<Box sx={{ padding: { xd: '0px 10px', md: '0px 100px' } }}>
			<img src={bannerUrl} alt="banner" style={bannerCss} />

			<FormControl sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
				<label htmlFor="fileInput">
					<AddCircle fontSize="large" color="action" />
				</label>

				<input
					type="file"
					id="fileInput"
					style={{ display: 'none' }}
					onChange={e => {
						setFile(e.target.files[0]);
					}}
				/>

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

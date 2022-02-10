import { Grid } from '@mui/material';
import Post from './Post';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllContent } from '../service/api';
const Posts = () => {
	const [contents, setContents] = useState([]);

	useEffect(() => {
		const getContents = async () => {
			const contents = await getAllContent();
			console.log(contents);
			setContents(contents.data);
		};

		getContents();
	}, []);

	return (
		<Grid container>
			{contents.map(content => {
				return (
					<Grid
						key={content._id.toString()}
						item
						lg={3}
						sm={4}
						xs={12}
					>
						<Link
							to={`/content/${content._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<Post content={content} />
						</Link>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default Posts;

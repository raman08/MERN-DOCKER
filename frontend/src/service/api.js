import axios from 'axios';

const url = 'http://localhost:8000/api';
const instanse = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
		authorization: `Bearer ${localStorage.getItem('content-authToken')}`,
	},
});

export const createContent = async post => {
	try {
		console.log('Send Create Content Request');
		return await instanse.post(`/content/create`, post);
	} catch (err) {
		console.log(err);
	}
};

export const getAllContent = async () => {
	try {
		const response = await instanse.get('/content/all');
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const getSingleContent = async id => {
	try {
		const response = await instanse.get(`/content/${id}`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const editContent = async (id, data) => {
	try {
		console.log('Edit Content Id is', id);
		const response = await instanse.patch(`/content/edit/${id}`, data);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const deleteContent = async id => {
	try {
		const response = await instanse.delete(`/content/delete/${id}`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const uploadFile = async data => {
	try {
		const response = await instanse.post('/content/file/upload', data);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const registerUser = async data => {
	try {
		const response = await instanse.post('/user/signup', data);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const loginUser = async data => {
	try {
		const response = await instanse.post('/user/login', data);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const userProfile = async token => {
	try {
		const response = await instanse.get('/user/profile', {
			headers: { authorization: `Bearer ${token}` },
		});

		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const likeContent = async id => {
	try {
		const response = await instanse.put(`/content/like/${id}`);

		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const unlikeContent = async id => {
	try {
		const response = await instanse.post(`/content/unlike/${id}`);

		return response.data;
	} catch (err) {
		console.log(err);
	}
};

import axios from 'axios';

const url = 'http://localhost:8000/api';
const instanse = axios.create({
	baseURL: url,
	headers: { 'Content-Type': 'application/json' },
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

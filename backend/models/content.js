const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		image: {
			type: String,
			default:
				'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			default: '62054378916677c65a29d0d1',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('content', contentSchema);

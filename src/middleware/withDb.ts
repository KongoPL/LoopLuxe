import mongoose from 'mongoose';
import { NextRequest } from 'next/server';

export const withDB = (handler: (request?: NextRequest) => Promise<Response> | Response) => async (
	request: NextRequest
) => {
	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.MONGODB_URI);

		// Execute the handler
		const response = await handler(request);

		// Disconnect from MongoDB after handler execution
		await mongoose.connection.close();

		return response;
	} catch (error) {
		console.error('Error handling request:', error);

		return Response.json({'error': 'Internal Server Error'}, {
			status: 500
		});
	}
};

import { withDB } from "@/middleware";
import { Course } from "@/models";

export const GET = withDB(async () => {
	const data = await Course.findOne();

	if(!data) {
		throw new Error('Well, that\'s an error');
	}

	return Response.json({
		"Mongoose": "?",
		data: {
			title: data?.title
		}
	})
});

import { withDB } from "@/middleware";
import { EPostResourceType, IPost } from "@/models";

export interface IGetPostsResponse {
	items: IPost[];
}

export const GET = withDB(async () => {
	return Response.json({
		items: Array(20).fill({
			id: '1234',
			description: "Fancy post!",
			resource: {
				url: '/content/Snapinsta.app_video_336056191_763779018527662_7869447182078812765_n.mp4',
				type: EPostResourceType.VIDEO
			},
			stats: {
				comments: Math.round(Math.random() * 1000),
				likes: 1000 + Math.round(Math.random() * 100000),
				saves: 1000000 + Math.round(Math.random() * 1000000),
			},
			user: {
				id: '123',
				name: 'johndoe123'
			},
			createdAt: new Date(),
		} satisfies IPost).map((p, i) => ({...p, id: +i + 1, description: p.description+' #'+(+i+1)}))
	} satisfies IGetPostsResponse)
});

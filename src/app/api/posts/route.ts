import { withDB } from "@/middleware";
import { EPostResourceType, IPost } from "@/models";

export interface IGetPostsResponse {
	items: IPost[];
}

export const GET = withDB(async () => {
	return Response.json({
		items: [
			{
				id: '1234',
				description: "Fancy post!",
				resource: {
					url: '/content/Snapinsta.app_video_336056191_763779018527662_7869447182078812765_n.mp4',
					type: EPostResourceType.VIDEO
				}
			}
		] as IPost[]
	} satisfies IGetPostsResponse)
});
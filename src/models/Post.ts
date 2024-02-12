import { Schema } from "mongoose";
import { required } from "./models.const";
import { defineModel } from "./models.utils";

export interface IPost {
	id: string;
	description: string;
	resource: {
		url: string;
		type: EPostResourceType;
	};
	stats: {
		likes?: number;
		comments?: number;
		saves?: number;
	}
}

export enum EPostResourceType {
	VIDEO
};

const schema = new Schema<IPost>({
	description: { type: String, required },
	resource: {
		url: { type: String, required },
		type: { type: String } // @TODO Fix lack of enum type
		// url: { type: String, required },
		// type: { enum: [0], required }
	},
	// resource: {
	// 	required,
	// 	type: new Schema<IPost['resource']>({
	// 		url: { type: String, required },
	// 		type: { type: String, required }
	// 	})
	// }
	stats: {
		likes: { type: Number },
		comments: { type: Number },
		saves: { type: Number },
	}
})

export const Post = defineModel('posts', schema);

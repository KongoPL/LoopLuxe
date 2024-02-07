import mongoose, { Model, Schema, model } from "mongoose";

const required = true;

export interface ICourse {
	title: string;
	description: string;
}

const courseSchema = new Schema<ICourse>({
	title: { type: String, required },
	description: { type: String, required },
})

// nullish operator is fail-safe for overwriting models on hot-reload
export const Course = mongoose.models.courses as Model<ICourse> ?? model<ICourse>('courses', courseSchema);

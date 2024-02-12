import { PopulatedDoc, Schema } from "mongoose";
import { required } from "./models.const";
import { defineModel } from "./models.utils";

export interface IUser {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
}

const schema = new Schema<IUser>({
	name: { type: String, required },
	email: { type: String, required },
	createdAt: { type: Date, required },
})

export const User = defineModel('users', schema);

export const isUserModel = <ExpectedType = IUser>(user: ExpectedType | PopulatedDoc<ExpectedType>): user is ExpectedType => {
	return typeof user === 'object' && user !== null ? 'id' in user : false;
}

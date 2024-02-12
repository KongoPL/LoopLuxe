import mongoose, { CompileModelOptions, HydratedDocument, InferSchemaType, Model, ObtainSchemaGeneric, Schema, model } from "mongoose";

// Method for defining models, as a fail-safe for overwriting models on hot-reload
export const defineModel = <TSchema extends Schema>(
	name: string,
	schema?: TSchema,
	collection?: string,
	options?: CompileModelOptions
) => {
	if(mongoose.models && name in mongoose.models) {
		// Model already defined, return this as the same thing that model() method would return
		// ReturnType<typeof model<TSchema>> for some reason doesn't return same value.
		return mongoose.models[name] as Model<
			InferSchemaType<TSchema>,
			ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>,
			ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
			ObtainSchemaGeneric<TSchema, 'TVirtuals'>,
			HydratedDocument<
			InferSchemaType<TSchema>,
			ObtainSchemaGeneric<TSchema, 'TVirtuals'> & ObtainSchemaGeneric<TSchema, 'TInstanceMethods'>,
			ObtainSchemaGeneric<TSchema, 'TQueryHelpers'>
		>,
		TSchema
		> & ObtainSchemaGeneric<TSchema, 'TStaticMethods'>
	}

	return model<TSchema>(name, schema, collection, options);
}

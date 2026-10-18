import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().optional().default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().optional().nullable().default(""),
		lang: z.string().optional().default(""),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});

const specCollection = defineCollection({
	schema: z.object({
	    title: z.string().optional(),
		order: z.number().default(0),
	}),
});

export const friendItemSchema = z.object({
	title: z.string().min(1),
	imgurl: z.string().url(),
	desc: z.string().min(1),
	siteurl: z.string().url(),
	tags: z.array(z.string()).default([]),
});

export type FriendItem = z.infer<typeof friendItemSchema>;

const dataCollection = defineCollection({
	type: "data",
	schema: ({ id }) => {
		if (id === "friends") {
			return z.array(friendItemSchema);
		}
		return z.any();
	},
});

export const collections = {
	posts: postsCollection,
	spec: specCollection,
	data: dataCollection,
};
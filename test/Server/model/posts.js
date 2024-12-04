/** @type {{ items: Posts[] }} */
const data = require("../data/posts.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/posts").Posts} Posts
 */

/**
 * Get all posts
 * @returns {Promise<DataListEnvelope<Posts>>}
 */
async function getAll() {
    const { data: posts, error, count } = await conn
        .from("posts")
        .select("*", { count: "estimated" });
    
    return {
        isSuccess: !error,
        message: error?.message,
        data: posts,
        total: count,
    };
}

/**
 * Get a post by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Posts>>}
 */
async function get(id) {
    const { data: post, error } = await conn
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
    
    return {
        isSuccess: !error,
        message: error?.message,
        data: post,
    };
}

/**
 * Add a new post
 * @param {Posts} post
 * @returns {Promise<DataEnvelope<Posts>>}
 */
async function add(post) {
    const { data, error } = await conn
        .from("posts")
        .insert([
            {
                // Exclude 'id' from being sent in the request body
                title: post.title,
                body: post.body,
                tags: post.tags,
                reactions: post.reactions,
                views: post.views,
                userId: post.userId,
                imageUrl: post.imageUrl,
                timestamp: post.timestamp,
                duration: post.duration,
            },
        ])
        .select("*")
        .single();

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
    };
}

/**
 * Seed the posts data into the database
 */
async function seed() {
    for (const post of data.items) {
        // Exclude 'id' while seeding data
        const { id, ...postWithoutId } = post;
        await add(postWithoutId);
    }
}

/**
 * Update a post
 * @param {number} id
 * @param {Posts} post
 * @returns {Promise<DataEnvelope<Posts>>}
 */
async function update(id, post) {
    const { data, error } = await conn
        .from("posts")
        .update({
            title: post.title,
            body: post.body,
            tags: post.tags,
            reactions: post.reactions,
            views: post.views,
            userId: post.userId,
            imageUrl: post.imageUrl,
            timestamp: post.timestamp,
            duration: post.duration,
        })
        .eq("id", id)
        .select("*")
        .single();

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
    };
}

/**
 * Remove a post
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
    const { data, error } = await conn
        .from("posts")
        .delete()
        .eq("id", id)
        .select("*")
        .single();

    return {
        isSuccess: !error,
        message: error?.message,
        data: data,
    };
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove,
    seed,
};

const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/users").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
    // Ensure you are querying the correct table name
    const { data: users, error, count } = await conn
        .from("users") // Ensure that "users" is defined in your Supabase schema
        .select("*", { count: "estimated" });

    return {
        isSuccess: !error,
        message: error?.message,
        data: users,
        total: count,
    };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
    const { data: user, error } = await conn
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    return {
        isSuccess: !error,
        message: error?.message,
        data: user,
    };
}

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
    const { data, error } = await conn
        .from("users") // Correct table name
        .insert([
            {
                name: user.name,
                email: user.email,
                profile_image: user.profileImage, 
                created_at: user.createdAt,
                role: user.role, // Adding role
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
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(id, user) {
    const { data, error } = await conn
        .from("users") // Ensure "users" is a valid table
        .update({
            name: user.name,
            email: user.email,
            profile_image: user.profileImage,
            created_at: user.createdAt,
            role: user.role, // Updating role
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
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
    const { data, error } = await conn
        .from("users") // Ensure "users" is a valid table
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
};

/*  B"H
 */
require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

/**
 * @typedef {import('../../Client/src/models/supabase').Database } PostsDatabase
 * @typedef {import('@supabase/supabase-js').SupabaseClient<PostsDatabase>} PostsClient
 */

module.exports = {
    /**
     * @returns {PostsClient}
     */
    getConnection() {
        return createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SECRET_KEY
        )
    },
}

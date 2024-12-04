/* B"H */
require("dotenv").config()
const { createClient } = require("@supabase/supabase-js")

/**
 * @typedef {import('../../Client/src/models/supabase').Database} Database
 * @typedef {import('@supabase/supabase-js').SupabaseClient<Database>} SupabaseClient
 */

module.exports = {
  /**
   * @returns {SupabaseClient}
   */
  getConnection() {
    return createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY
    )
  },
}

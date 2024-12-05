/* B"H
  This file is generated. Do not modify it directly. Instead, modify the Supabase schema in the Supabase admin console.
  To generate this file you cal install the Supabase CLI and run `supabase generate typescript`.
  Or go to https://supabase.com/dashboard/project/<your project id>/api?page=tables-intro and click on the "Generate and Download types" button.
  To get your project id, look at the url when you click on the project in the Supabase dashboard.
  thanks for the instruction, change to fit my project 
*/export type Json =
| string
| number
| boolean
| null
| { [key: string]: Json | undefined }
| Json[]

export type Database = {
graphql_public: {
  Tables: {
    [_ in never]: never
  }
  Views: {
    [_ in never]: never
  }
  Functions: {
    graphql: {
      Args: {
        operationName?: string
        query?: string
        variables?: Json
        extensions?: Json
      }
      Returns: Json
    }
  }
  Enums: {
    [_ in never]: never
  }
  CompositeTypes: {
    [_ in never]: never
  }
}
public: {
  Tables: {
    posts: {
      Row: {
        body: string
        createdat: string | null
        duration: number
        id: number
        imageUrl: string
        reactions: Json
        tags: string[]
        timestamp: string
        title: string
        updatedat: string | null
        userId: number
        views: number
      }
      Insert: {
        body: string
        createdat?: string | null
        duration: number
        id?: number
        imageUrl: string
        reactions: Json
        tags: string[]
        timestamp: string
        title: string
        updatedat?: string | null
        userId: number
        views: number
      }
      Update: {
        body?: string
        createdat?: string | null
        duration?: number
        id?: number
        imageUrl?: string
        reactions?: Json
        tags?: string[]
        timestamp?: string
        title?: string
        updatedat?: string | null
        userId?: number
        views?: number
      }
      Relationships: []
    }
    users: {
      Row: {
        created_at: string | null
        email: string | null
        id: number
        name: string
        profile_image: string | null
        role: string | null
      }
      Insert: {
        created_at?: string | null
        email?: string | null
        id?: number
        name: string
        profile_image?: string | null
        role?: string | null
      }
      Update: {
        created_at?: string | null
        email?: string | null
        id?: number
        name?: string
        profile_image?: string | null
        role?: string | null
      }
      Relationships: []
    }
  }
  Views: {
    [_ in never]: never
  }
  Functions: {
    [_ in never]: never
  }
  Enums: {
    [_ in never]: never
  }
  CompositeTypes: {
    [_ in never]: never
  }
}
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R
  }
  ? R
  : never
: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
  schema: keyof Database
}
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never
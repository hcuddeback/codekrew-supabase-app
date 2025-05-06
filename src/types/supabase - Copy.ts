export type Json =
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
      calendar_events: {
        Row: {
          created_at: string | null
          event_date: string
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_date: string
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_date?: string
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chat_logs: {
        Row: {
          bot_name: string | null
          created_at: string | null
          id: string
          message: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          bot_name?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          bot_name?: string | null
          created_at?: string | null
          id?: string
          message?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          provider: Database["public"]["Enums"]["payment_provider"] | null
          provider_customer_id: string | null
        }
        Insert: {
          id: string
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          provider_customer_id?: string | null
        }
        Update: {
          id?: string
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          provider_customer_id?: string | null
        }
        Relationships: []
      }
      dashboard_widgets: {
        Row: {
          created_at: string
          id: string
          position: number
          settings: Json
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          position?: number
          settings?: Json
          title: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          position?: number
          settings?: Json
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string | null
          filename: string | null
          id: string
          task_id: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          filename?: string | null
          id?: string
          task_id?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          filename?: string | null
          id?: string
          task_id?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_images: {
        Row: {
          aspect_ratio_type: string
          created_at: string | null
          generation_params: Json | null
          id: string
          is_favorite: boolean | null
          mime_type: string | null
          model_id: string
          prediction_id: string
          prompt: string
          public_url: string
          size: number | null
          storage_path: string
          user_id: string
        }
        Insert: {
          aspect_ratio_type: string
          created_at?: string | null
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean | null
          mime_type?: string | null
          model_id: string
          prediction_id: string
          prompt: string
          public_url: string
          size?: number | null
          storage_path: string
          user_id: string
        }
        Update: {
          aspect_ratio_type?: string
          created_at?: string | null
          generation_params?: Json | null
          id?: string
          is_favorite?: boolean | null
          mime_type?: string | null
          model_id?: string
          prediction_id?: string
          prompt?: string
          public_url?: string
          size?: number | null
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      github_tokens: {
        Row: {
          access_token: string
          created_at: string | null
          id: string
        }
        Insert: {
          access_token: string
          created_at?: string | null
          id: string
        }
        Update: {
          access_token?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          title: string | null
          user_id: string
          user_project_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
          user_id: string
          user_project_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string | null
          user_id?: string
          user_project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_project_id_fkey"
            columns: ["user_project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          provider: Database["public"]["Enums"]["payment_provider"] | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: []
      }
      project_integrations: {
        Row: {
          created_at: string | null
          github_owner: string | null
          github_repo: string | null
          id: string
          project_id: string | null
          vercel_project_id: string | null
          vercel_url: string | null
        }
        Insert: {
          created_at?: string | null
          github_owner?: string | null
          github_repo?: string | null
          id?: string
          project_id?: string | null
          vercel_project_id?: string | null
          vercel_url?: string | null
        }
        Update: {
          created_at?: string | null
          github_owner?: string | null
          github_repo?: string | null
          id?: string
          project_id?: string | null
          vercel_project_id?: string | null
          vercel_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_integrations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          team_id: string | null
          template_slug: string | null
          updated_at: string | null
          user_id: string | null
          vercel_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          team_id?: string | null
          template_slug?: string | null
          updated_at?: string | null
          user_id?: string | null
          vercel_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          team_id?: string | null
          template_slug?: string | null
          updated_at?: string | null
          user_id?: string | null
          vercel_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          created_at: string | null
          id: number
          payload: Json | null
          provider: string | null
          purchase_id: string | null
          type: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          payload?: Json | null
          provider?: string | null
          purchase_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          payload?: Json | null
          provider?: string | null
          purchase_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      roadmap_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          tag: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          tag?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          tag?: string | null
          title?: string | null
        }
        Relationships: []
      }
      site_tasks: {
        Row: {
          created_at: string | null
          id: string | null
          status: string | null
          step: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          status?: string | null
          step?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          status?: string | null
          step?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          preview_image_url: string | null
          slug: string
          template_type: string | null
          version: string | null
          zip_url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          preview_image_url?: string | null
          slug: string
          template_type?: string | null
          version?: string | null
          zip_url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          preview_image_url?: string | null
          slug?: string
          template_type?: string | null
          version?: string | null
          zip_url?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_anchor: number | null
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          card_brand: string | null
          card_last_four: string | null
          created: string | null
          current_period_end: string | null
          current_period_start: string | null
          ended_at: string | null
          id: string
          metadata: Json | null
          order_id: number | null
          order_item_id: number | null
          price_id: string | null
          provider: Database["public"]["Enums"]["payment_provider"]
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end: string | null
          trial_start: string | null
          urls: Json | null
          user_id: string
          variant_id: number | null
          variant_name: string | null
        }
        Insert: {
          billing_anchor?: number | null
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          card_brand?: string | null
          card_last_four?: string | null
          created?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id: string
          metadata?: Json | null
          order_id?: number | null
          order_item_id?: number | null
          price_id?: string | null
          provider: Database["public"]["Enums"]["payment_provider"]
          quantity?: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          urls?: Json | null
          user_id: string
          variant_id?: number | null
          variant_name?: string | null
        }
        Update: {
          billing_anchor?: number | null
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          card_brand?: string | null
          card_last_four?: string | null
          created?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          order_id?: number | null
          order_item_id?: number | null
          price_id?: string | null
          provider?: Database["public"]["Enums"]["payment_provider"]
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_end?: string | null
          trial_start?: string | null
          urls?: Json | null
          user_id?: string
          variant_id?: number | null
          variant_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          details: string | null
          id: number
          is_complete: boolean | null
          task: string | null
          user_id: string
          user_project_id: string | null
        }
        Insert: {
          created_at: string
          details?: string | null
          id?: number
          is_complete?: boolean | null
          task?: string | null
          user_id: string
          user_project_id?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: number
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
          user_project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_project_id_fkey"
            columns: ["user_project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_logs: {
        Row: {
          action: string | null
          created_at: string | null
          feature: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          feature?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          feature?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_dashboard_widgets: {
        Row: {
          id: string
          position: Json | null
          user_id: string | null
          widget_type: string | null
        }
        Insert: {
          id?: string
          position?: Json | null
          user_id?: string | null
          widget_type?: string | null
        }
        Update: {
          id?: string
          position?: Json | null
          user_id?: string | null
          widget_type?: string | null
        }
        Relationships: []
      }
      user_projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          credits: number | null
          email: string | null
          full_name: string | null
          id: string
          is_new_user: boolean | null
          payment_method: Json | null
          purchase: string | null
          resend_contact_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          is_new_user?: boolean | null
          payment_method?: Json | null
          purchase?: string | null
          resend_contact_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_new_user?: boolean | null
          payment_method?: Json | null
          purchase?: string | null
          resend_contact_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string | null
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          message?: string | null
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
      payment_provider: "stripe" | "lemonsqueezy"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      payment_provider: ["stripe", "lemonsqueezy"],
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
        "paused",
      ],
      user_role: ["user", "admin"],
    },
  },
} as const

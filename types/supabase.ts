export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          coordinators: string[] | null;
          covenor: string | null;
          details: string | null;
          fees: number | null;
          id: number;
          is_open: boolean;
          min_members: number;
          min_team_size: number;
          multiple_registrations_allowed: boolean;
          name: string;
          poster_image: string | null;
          rules_regulations: string;
          team_size: number;
          type: string;
          prize_pool: number;
        };
        Insert: {
          coordinators?: string[] | null;
          covenor?: string | null;
          details?: string | null;
          fees?: number | null;
          id?: number;
          is_open: boolean;
          min_members?: number;
          min_team_size?: number;
          multiple_registrations_allowed: boolean;
          name: string;
          poster_image?: string | null;
          rules_regulations: string;
          team_size: number;
          type: string;
          prize_pool?: number;
        };
        Update: {
          coordinators?: string[] | null;
          covenor?: string | null;
          details?: string | null;
          fees?: number | null;
          id?: number;
          is_open?: boolean;
          min_members?: number;
          min_team_size?: number;
          multiple_registrations_allowed?: boolean;
          name?: string;
          poster_image?: string | null;
          rules_regulations?: string;
          team_size?: number;
          type?: string;
          prize_pool?: number;
        };
      };
      participation: {
        Row: {
          event_id: number;
          id: string;
          phone_number: string | null;
          registered_by: string;
          registration_cancelled: boolean | null;
          team_member_0: string | null;
          team_member_1: string | null;
          team_member_10: string | null;
          team_member_11: string | null;
          team_member_12: string | null;
          team_member_13: string | null;
          team_member_14: string | null;
          team_member_15: string | null;
          team_member_2: string | null;
          team_member_3: string | null;
          team_member_4: string | null;
          team_member_5: string | null;
          team_member_6: string | null;
          team_member_7: string | null;
          team_member_8: string | null;
          team_member_9: string | null;
          team_name: string | null;
          transaction_id: string | null;
          transaction_screenshot_file_name: string | null;
          transaction_verified: boolean | null;
          upi_id: string | null;
          /* join with events table through event id */
          events?: {
            id: number;
            name: string;
            poster_image: string;
            fees: number;
          };
        };
        Insert: {
          event_id: number;
          id?: string;
          phone_number?: string | null;
          registered_by?: string | null;
          registration_cancelled?: boolean | null;
          team_member_0?: string | null;
          team_member_1?: string | null;
          team_member_10?: string | null;
          team_member_11?: string | null;
          team_member_12?: string | null;
          team_member_13?: string | null;
          team_member_14?: string | null;
          team_member_15?: string | null;
          team_member_2?: string | null;
          team_member_3?: string | null;
          team_member_4?: string | null;
          team_member_5?: string | null;
          team_member_6?: string | null;
          team_member_7?: string | null;
          team_member_8?: string | null;
          team_member_9?: string | null;
          team_name?: string | null;
          transaction_id?: string | null;
          transaction_screenshot_file_name?: string | null;
          transaction_verified?: boolean | null;
          upi_id?: string | null;
        };
        Update: {
          event_id?: number;
          id?: string;
          phone_number?: string | null;
          registered_by?: string | null;
          registration_cancelled?: boolean | null;
          team_member_0?: string | null;
          team_member_1?: string | null;
          team_member_10?: string | null;
          team_member_11?: string | null;
          team_member_12?: string | null;
          team_member_13?: string | null;
          team_member_14?: string | null;
          team_member_15?: string | null;
          team_member_2?: string | null;
          team_member_3?: string | null;
          team_member_4?: string | null;
          team_member_5?: string | null;
          team_member_6?: string | null;
          team_member_7?: string | null;
          team_member_8?: string | null;
          team_member_9?: string | null;
          team_name?: string | null;
          transaction_id?: string | null;
          transaction_screenshot_file_name?: string | null;
          transaction_verified?: boolean | null;
          upi_id?: string | null;
        };
      };
      swc_details: {
        Row: {
          email: string;
          id: number;
          name: string | null;
          phone: number;
          transaction_id: string | null;
        };
        Insert: {
          email?: string;
          id?: number;
          name?: string | null;
          phone: number;
          transaction_id?: string | null;
        };
        Update: {
          email?: string;
          id?: number;
          name?: string | null;
          phone?: number;
          transaction_id?: string | null;
        };
      };
      users: {
        Row: {
          college: string | null;
          email: string | null;
          id: string;
          is_rcc: boolean | null;
          name: string | null;
          phone: number | null;
          role: string | null;
          swc_payment: boolean | null;
          year: number | null;
        };
        Insert: {
          college?: string | null;
          email?: string | null;
          id: string;
          is_rcc?: boolean | null;
          name?: string | null;
          phone?: number | null;
          role?: string | null;
          swc_payment?: boolean | null;
          year?: number | null;
        };
        Update: {
          college?: string | null;
          email?: string | null;
          id?: string;
          is_rcc?: boolean | null;
          name?: string | null;
          phone?: number | null;
          role?: string | null;
          swc_payment?: boolean | null;
          year?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

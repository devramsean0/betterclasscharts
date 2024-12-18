export interface IStudentLogin {
    success?: number;
    data?: {
      id?: number;
      name?: string;
      first_name?: string;
      last_name?: string;
      avatar_url?: string;
      display_behaviour?: boolean;
      display_parent_behaviour?: boolean;
      display_homework?: boolean;
      display_rewards?: boolean;
      display_detentions?: boolean;
      display_report_cards?: boolean;
      display_classes?: boolean;
      display_announcements?: boolean;
      display_academic_reports?: boolean;
      display_attendance?: boolean;
      display_attendance_type?: string;
      display_attendance_percentage?: boolean;
      display_activity?: boolean;
      display_mental_health?: boolean;
      display_mental_health_no_tracker?: boolean;
      display_timetable?: boolean;
      is_disabled?: boolean;
      display_two_way_communications?: boolean;
      display_absences?: boolean;
      can_upload_attachments?: boolean;
      display_event_badges?: boolean;
      display_avatars?: boolean;
      display_concern_submission?: boolean;
      display_custom_fields?: boolean;
      pupil_concerns_help_text?: string;
      allow_pupils_add_timetable_notes?: boolean;
      detention_alias_plural_uc?: string;
    };
    meta?: {
      session_id?: string;
    };
    error?: string;
  }

export interface IBehaviour {
  data?: {
    timeline?: {
      positive?: number;
      negative?: number;
      name?: string;
      start?: string;
      end?: string;
    }[];
    positive_reasons?: {
      [k: string]: number;
    };
    negative_reasons?: {
      [k: string]: number;
    };
    other_positive?: string[];
    other_negative?: string[];
    other_positive_count?: {}[];
    other_negative_count?: {}[];
  };
  meta?: {
    start_date?: string;
    end_date?: string;
    step_size?: string;
  };
  success?: number;
}

export interface IBehaviourError {
  data?: {
    [k: string]: unknown;
  };
  meta?: {
    [k: string]: unknown;
  };
  success?: number;
  expired?: number;
  error?: string;
}
 
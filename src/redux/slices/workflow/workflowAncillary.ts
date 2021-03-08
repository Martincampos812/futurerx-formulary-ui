export interface WorkflowState {
  case: number;
  claim: Claim | null;
  claimStage: ClaimStage | null;
  taskDetails: TaskDetail | null;
  notes: Note[];
  isLoading: boolean;
  error: string | null;
}

export interface Claim {
  instance_id: number | null;
  completed_date: string | null;
  user_id: number | null;
  first_name: string | null;
  last_name: string | null;
  stage_id: number | null;
  stage_name: string | null;
  is_push_task: boolean | null;
  stage_position: string | null;
  insert_datetime: string | null;
  due_date: string | null;
  instance_stage_id: number | null;
  has_access: boolean | null;
}

export interface ClaimStage {
  status: StageStatus[];
  stage_id: number | null;
  stage_name: string | null;
  code: string | null;
  message: string | null;
}

export interface StageStatus {
  stage_status_id: number | null;
  function_stage_status_id: number | null;
  function_stage_status_name: string | null;
  reasons: Reason[];
}

export interface Reason {
  reason_id: number | null;
  reason: string | null;
  explanations: Explanation[];
}

export interface TaskDetail {
  task: Task;
  subtasks: any[];
  count: number;
}

export interface Task {
  id_entity: number | null;
  task_name: string | null;
  task_description: string | null;
  created_datetime: string | null;
  due_datetime: string | null;
  remaining_seconds: number;
  remaining_minutes: number;
  remaining_hours: number;
  remaining_days: number;
  workflow: string | null;
  stage_owned_by: string | null;
  created_by: string | null;
  stage_name: string | null;
  suspend_datetime: string | null;
}

export interface Explanation {
  explanation_id: number | null;
  explanation: string | null;
  notifications: any[];
}

export interface Note {
  id_note: number | null;
  note: string | null;
  screen_section: string | null;
  screen_section_name: string | null;
  is_editable: boolean | null;
  insert_user: string | null;
  insert_datetime: string | null;
  difference: string | null;
}

export interface WorkflowRoutePayload {
  explanation_id: number | null | undefined;
  instance_id: number | null;
  instance_stage_id: number | null;
  function_id: number | null;
  entity_id: number | null;
  stage_id: number | null;
  barcodes: any[] | null | undefined;
}

export interface ClaimWorkPayload {
  type: string | null;
  work: [
    {
      stage_id: number | null;
      instance_id: number | null;
      task_type: number | null;
      entity_id: number | null;
    }
  ];
}

export interface SubTaskPayload{
  name: string | number;
  description: string | number;
  assign_type: string | null;
  assigned_to: number | null;
  due_date: string | null;
  due_time: string | number;
  priority: string | null;
  instance_stage_id: number | null;
  entity_id: number | null;
}

export interface NoteListPayload {
  filter: any[];
  search_key: string;
}

export interface NotePostPayload {
  document_id: string | null;
  note: string | null;
  id_note: number | null;
  screen: string | null;
}

// export const defaultNoteListPayload: NoteListPayload = {
//   filter: [],
//   search_key: "",
// };

// export function determineCase(claim: any): any {
//   return 0;
// }

// export const defaultNote: Note = {
//   id_note: null,
//   note: null,
//   screen_section: null,
//   screen_section_name: null,
//   is_editable: null,
//   insert_user: null,
//   insert_datetime: null,
//   difference: null,
// };

// export const defaultClaimStatus: ClaimStatus = {
//   instance_id: null,
//   completed_date: null,
//   user_id: null,
//   first_name: null,
//   last_name: null,
//   stage_id: null,
//   stage_name: null,
//   is_push_task: null,
//   stage_position: null,
//   insert_datetime: null,
//   due_date: null,
//   instance_stage_id: null,
//   has_access: null,
// };

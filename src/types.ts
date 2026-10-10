export type Category='Task'|'Idea'|'Reminder'|'Shopping'|'Project Note'|'Question'|'Reference'|'Someday';
export type CaptureStatus='inbox'|'processed'|'deferred'|'archived';
export type Destination='HouseBrain'|'MeetingPilot'|'PackOps'|'Volunteer Wrangler'|'Mission Control';
export interface Capture {id:string;body:string;createdAt:number;updatedAt:number;status:CaptureStatus;category?:Category;contextIds:string[];tagIds:string[];deferUntil?:number;attachmentIds:string[]}
export interface Attachment {id:string;captureId:string;name:string;mime:string;blob:Blob;createdAt:number}
export interface CategoryRecord {id:string;name:Category}
export interface ProjectContext {id:string;name:string;createdAt:number}
export interface Tag {id:string;name:string;createdAt:number}
export interface Task {id:string;captureId:string;title:string;description:string;projectId?:string;priority:'low'|'normal'|'high';dueAt?:number;status:'open'|'done';createdAt:number;updatedAt:number}
export interface Reminder {id:string;captureId:string;title:string;dueAt:number;completed:boolean;createdAt:number}
export interface ProcessingSuggestion {id:string;captureId:string;category:Category;proposedActions:string[];engine:string;createdAt:number}
export interface ExternalAction {id:string;sourceCaptureId:string;destination:Destination;payloadVersion:1;payload:{title:string;description?:string;taskId?:string};deliveryStatus:'draft'|'exported'|'delivered'|'failed';attempts:number;lastAttemptAt?:number;nextRetryAt?:number;createdAt:number}
export interface ActivityLog {id:string;entityId:string;event:string;at:number;details?:string}
export interface Backup {format:'braindump-backup';version:1;exportedAt:number;tables:{captures:Capture[];attachments:Array<Omit<Attachment,'blob'> & {dataUrl:string}>;categories:CategoryRecord[];contexts:ProjectContext[];tags:Tag[];tasks:Task[];reminders:Reminder[];suggestions:ProcessingSuggestion[];externalActions:ExternalAction[];activity:ActivityLog[]}}

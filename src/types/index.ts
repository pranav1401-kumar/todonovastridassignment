export interface Task{
    id:string;
    title:string;
    completed:boolean;
    createdAt: Date;

}

export type FilterType='all'| 'completed'| 'pending';

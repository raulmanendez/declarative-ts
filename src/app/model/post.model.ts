export interface Post {
    id?: string;
    title:string
    description:string
    student:string
    studentName?:string
}

export interface CRUDAction<T> {
    action: 'add' | 'update' | 'delete';
    data: T;
  }
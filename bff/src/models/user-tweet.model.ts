export interface User{
    id: string ;
    email: string ;
    password: string ;
    fullName: string ;
    birthday: Date ;
    isActive: boolean ;
    roles: string[];
}

export interface Tweet{
    twitt_id: string;
    content:string;
    createdAt: Date;
    EditedAt: Date| null;
    isEdited: boolean;
    fullName: string;
}

export interface UserTweet{
    content: string;
    user: User;
}
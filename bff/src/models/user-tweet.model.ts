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
    id: string;
}

export interface LikeTweet{
    like_id: string;
    createdAt: Date;
    idTwitt: string;
    id: string;
}

export interface Retweet{
    retweet_id: string;
    createdAt: Date;
    idTwitt: string;
    id: string;
}

export interface Commentaries{
    comment_id: string;
    content: string;
    createdAt: Date;
    EditedAt: Date | null;
    isEdited: boolean;
    idTwitt: string;
    id: string;
}

export interface UserTweet{
    tweet: Tweet,
    user: User;
}

export interface UserComments{
    comment: Commentaries;
    user: User;
}

export interface UserRetweets{
    // tweet:Tweet; //Acá no se agrega tweet porque lanza undefined
    user: User;
}
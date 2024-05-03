export interface IFile {
    file_id: string,
    name: string,
    url: string,
    accesses: IAccess[]
}

export interface IAccess {
    fullname: string,
    email: string,
    type: 'author' | 'co-author'
}
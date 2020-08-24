export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    title: string;
    companyName: string;
    logoUrl: string;
    city: string;
    salary: string;
}

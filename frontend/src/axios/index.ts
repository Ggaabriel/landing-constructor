import axios, { AxiosError } from "axios";

interface IuserFetch {
    phone_number?: string;
    birthday?: string;
    first_name?: string;
    last_name?: string;
    bio: string;
    status: string;
}
interface IpostUserProject {
    title: string;
    slogan: string;
    goal: string;
    description: string;
    tags: string[];
}

interface IProcedure {
    background_color: string;
    blur: number;
    color: string;
    count: number;
    speed: number;
}
interface IpostTemplate {
    name: string;
    background_color: string;
    text_color: string;
    text_align: string;
    scheme: string;
    background_type: string;
    procedure_background: IProcedure;
}

interface IpatchModule {
    background_color?: string;
    header_text?: string;
    subheader_text?: string;
    text_align?: string;
    text_color?: string;
    background_type?: string;
    procedure_background?: IProcedure;
}


interface IpostModule {
    background_color: string;
    header_text: string;
    subheader_text: string;
    text_align: string;
    text_color: string;
    background_type: string;
    procedure_background: IProcedure;
}

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

//user
export async function getUserById(userId: string) {
    try {
        const { data: user } = await axiosInstance.get(`/user/${userId}`);
        return { user };
    } catch (err: any) {
        const status = (err as AxiosError).response?.status;
        return { status };
    }
}

export async function patchUserById(userId: string, fields: IuserFetch) {
    const { data } = await axiosInstance.patch(`/user/${userId}`, fields);
    return data;
}
export async function postUserImage(userId: string, image: FormData) {
    const { data } = await axiosInstance.post(`/user/${userId}/image`, image);
    return data;
}
export async function postUserById(userId: string, fields: IuserFetch) {
    const { data } = await axiosInstance.post(`/user/${userId}`, fields);
    return data;
}
//project
export async function getProjectById(projectId: string) {
    const { data } = await axiosInstance.get(`/project/${projectId}`);
    return data;
}

export async function deleteProjectById(projectId: string) {
    const { data } = await axiosInstance.delete(`/project/${projectId}`);
    return data;
}

export async function postProjectByUserId(
    userId: string,
    fields: IpostUserProject
) {
    const { data } = await axiosInstance.post(
        `/user/${userId}/project`,
        fields
    );
    return data;
}
//template
export async function getTemplateById(templateId: string) {
    const { data } = await axiosInstance.get(`/template/${templateId}`);
    return data;
}
export async function postTemplateById(
    projectId: string,
    fields: IpostTemplate
) {
    const { data } = await axiosInstance.post(
        `/project/${projectId}/template`,
        fields
    );
    return data;
}
export async function deleteTemplateById(templateId: string) {
    const { data } = await axiosInstance.delete(`/template/${templateId}/`);
    return data;
}
export async function patchTemplateById(templateId: string, fields: any) {
    const { data } = await axiosInstance.patch(
        `/template/${templateId}`,
        fields
    );
    return data;
}
export async function postTemplateImg(templateId: string, formData: any) {
       const { data } = await axiosInstance.post(
        `/template/${templateId}/image`,
        formData
    );
    return data; 
    
}

export async function postProjectLogo(templateId: string, formData: any) {
    const { data } = await axiosInstance.post(
        `/project/${templateId}/logo`,
        formData
    );
    return data;
}

export async function getTemplateImg(templateId: string) {
    const { data } = await axiosInstance.get(`/template/${templateId}/image`);
    return data;
}
//module
export async function postModuleImg(moduleId: string, formData: any) {
    const { data } = await axiosInstance.post(
        `/module/${moduleId}/image`,
        formData
    );
    return data;
}

export async function postModuleById(templateId: string, fields: IpostModule) {
    const { data } = await axiosInstance.post(
        `/template/${templateId}/module`,
        fields
    );
    return data;
}
export async function patchModuleById(moduleId: string, fields: IpatchModule) {
    const { data } = await axiosInstance.patch(`/module/${moduleId}`, fields, {
        maxBodyLength: 100000000,
        maxContentLength: 100000000
    });
    return data;
}
export async function getModuleById(moduleId: string) {
    const { data } = await axiosInstance.get(`/module/${moduleId}`);
    return data;
}
export const userId = "string";

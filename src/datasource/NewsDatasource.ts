import { BASE_URL, httpClient } from "../config/develop-config";
import { NewsEntities } from "../entities/NewsEntities";

export class NewsDatasource{
    static addNews(data : NewsEntities){
        const formData = new FormData();
        formData.append("file",data.file)
        formData.append("title",data.title)
        formData.append("details",data.details)
        formData.append("status",data.status)
        formData.append("createBy",data.createBy)
        formData.append("application",data.application)
        return httpClient
        .post(BASE_URL + "/promotion/news/upload",formData)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }

    static getNews(
        limit : number,
        offset : number,
        application : string | undefined,
        status : string | undefined,
        sortField : string | undefined,
        sortDirection : string | undefined,
        search : string | undefined,
    ){
        return httpClient
        .post(BASE_URL + "/promotion/news/find-all-news",{
            limit : limit,
            offset : offset,
            status : status,
            sortField : sortField,
            sortDirection : sortDirection,
            search : search,
            application : application
        })
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }

    static getNewsById(id : string){
        return httpClient.
        get(BASE_URL + `/promotion/news/${id}`)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }

    static editNews(data : NewsEntities){
        const formData = new FormData();
        if(!data.file){
            formData.append("title",data.title)
            formData.append("details",data.details)
            formData.append("status",data.status)
            formData.append("createBy",data.createBy)
            formData.append("application",data.application)
        }
        else{
            formData.append("file",data.file)
            formData.append("title",data.title)
            formData.append("details",data.details)
            formData.append("status",data.status)
            formData.append("createBy",data.createBy)
            formData.append("application",data.application)
        }
        return httpClient
        .post(BASE_URL + `/promotion/news/update/${data.id}`,formData)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }

    static deleteNews(id : string,path : string){
        return httpClient
        .delete(BASE_URL + `/promotion/news/delete?id=${id}&path=${path}`)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }
}
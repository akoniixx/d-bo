import { BASE_URL, httpClient } from "../config/config";
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
        formData.append("categoryNews",data.categoryNews)
        formData.append("campaignId",data.campaignId)
        formData.append("pinAll",new Boolean(data.pinAll).toString())
        formData.append("pinMain",new Boolean(data.pinMain).toString())
        if(!!data.startDate)formData.append("startDate",data.startDate)
        if(!!data.endDate)formData.append("endDate",data.endDate)
        if(!!data.typeLaunch)formData.append("typeLaunch",data.typeLaunch)
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
        pageType: string | undefined,
    ){
        return httpClient
        .post(BASE_URL + "/promotion/news/find-all-news",{
            limit : limit,
            offset : offset,
            status : status,
            sortField : sortField,
            sortDirection : sortDirection,
            search : search,
            application : application,
            pageType : pageType
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
            formData.append("categoryNews",data.categoryNews)
            formData.append("campaignId",data.campaignId)
            formData.append("pinAll",new Boolean(data.pinAll).toString())
            formData.append("pinMain",new Boolean(data.pinMain).toString())
        }
        else{
            formData.append("file",data.file)
            formData.append("title",data.title)
            formData.append("details",data.details)
            formData.append("status",data.status)
            formData.append("createBy",data.createBy)
            formData.append("application",data.application)
            formData.append("categoryNews",data.categoryNews)
            formData.append("campaignId",data.campaignId)
            formData.append("pinAll",new Boolean(data.pinAll).toString())
            formData.append("pinMain",new Boolean(data.pinMain).toString())
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
    static checkCountPoint(app : string){
        return httpClient.
        get(BASE_URL + `/promotion/news/check-count-pin?application=${app}`)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }
    static uploadNewsImageDescription(file : any){
        const formData = new FormData();
        formData.append("file",file)
        return httpClient
        .post(BASE_URL + "/promotion/news/upload-news-image-description",formData)
        .then(res => {return res.data})
        .catch(err => console.log(err))
    }
}
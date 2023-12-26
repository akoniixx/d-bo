import { BASE_URL, httpClient } from "../config/config"

export class CreditDronerDatasource{
    static getCreditDroner(
        page : number,
        take : number,
        dronerId : string,
        status : string,
        exchangeType : string,
        startDate : string,
        endDate : string,
        sortBy : string,
        sortDirection : string,
        minCredit : number,
        maxCredit : number,
        minPoint : number,
        maxPoint : number,
        minCash : number,
        maxCash : number
    ){
        const params = {
            page : page,
            take : take,
            dronerId : dronerId,
            status : status,
            exchangeType : exchangeType,
            startDate : startDate,
            endDate : endDate,
            sortBy : sortBy,
            sortDirection : sortDirection,
            minCredit : (minCredit === 0 && maxCredit === 0)?null:minCredit,
            maxCredit : (minCredit === 0 && maxCredit === 0)?null:maxCredit,
            minPoint : (minPoint === 0 && maxPoint === 0)?null:minPoint,
            maxPoint : (minPoint === 0 && maxPoint === 0)?null:maxPoint,
            minCash : (minCash === 0 && maxCash === 0)?null:minCash,
            maxCash : (minCash === 0 && maxCash === 0)?null:maxCash
        }

        return httpClient
        .get(BASE_URL + '/credit', { params })
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }

    static getCreditById(
      id : string
    ){
      return httpClient
        .get(BASE_URL + `/credit/${id}`)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }

    static addCredit(
      exchangeType : string,
      dronerId : string,
      credit : string,
      point : string,
      cash : string,
      slip : any,
      transfererName : string,
      banking : string,
      datetransfer : string
    ){
      const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
      const formData = new FormData()
      formData.append("listname","การแลกเครดิต")
      formData.append("dronerId",dronerId)
      formData.append("exchangeType",exchangeType)
      formData.append("createBy",profile.firstname + " " + profile.lastname)
      formData.append("updateBy",profile.firstname + " " + profile.lastname)
      formData.append("credit",credit)
      if(exchangeType === "CASH"){
        formData.append("status","PENDING")
        formData.append("cash",cash)
        formData.append("slip",slip)
        formData.append("transfererName",transfererName)
        formData.append("banking",banking)
        formData.append("datetransfer",datetransfer)

      }
      else{
        formData.append("status","APPROVE")
        formData.append("point",point)
      }
      return httpClient.post(BASE_URL+ '/credit',formData)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }

    static editCredit(
      id : string,
      exchangeType : string,
      dronerId : string,
      credit : string,
      point : string,
      cash : string,
      slip : any,
      transfererName : string,
      banking : string,
      datetransfer : string,
      status : string
    ){
      const profile = JSON.parse(localStorage.getItem('profile') || '{  }')
      const formData = new FormData()
      formData.append("listname","การแลกเครดิต")
      formData.append("dronerId",dronerId)
      formData.append("exchangeType",exchangeType)
      formData.append("createBy",profile.firstname + " " + profile.lastname)
      formData.append("updateBy",profile.firstname + " " + profile.lastname)
      formData.append("credit",credit)
      if(exchangeType === "CASH"){
        formData.append("status",status)
        formData.append("cash",cash)
        if(slip){
          formData.append("slip",slip)
        }
        formData.append("transfererName",transfererName)
        formData.append("banking",banking)
        formData.append("datetransfer",datetransfer)

      }
      else{
        formData.append("status",status)
        formData.append("point",point)
      }
      return httpClient.patch(BASE_URL+ `/credit/${id}`,formData)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }

    static deleteCredit(
      id : string,
      dronerId : string,
      reason : string
    ){
      return httpClient.patch(BASE_URL+ '/credit/cancel',{
        id : id,
        dronerId : dronerId,
        reason : reason
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
}
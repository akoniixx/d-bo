import { httpClient, BASE_URL } from "../config/config";
import { FarmerPlotEntity, HistoryEditRaiEntity } from "../entities/FarmerPlotEntities";

export class FarmerPlotDatasource {
  static insertFarmerPlot(data: FarmerPlotEntity): Promise<any> {
    delete data.id;
    return httpClient
      .post(BASE_URL + "/farmer-plot", data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err insertFarmerPlot");
      });
  }
  static updateFarmerPlot(data: FarmerPlotEntity): Promise<any> {
    return httpClient
      .patch(BASE_URL + "/farmer-plot/" + data.id, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err updateFarmerPlot");
      });
  }
  static deleteFarmerPlot(id?: string): Promise<any> {
    return httpClient
      .delete(BASE_URL + "/farmer-plot/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err deleteFarmerPlot");
      });
  }
  static getFarmerPlotById(id: string): Promise<FarmerPlotEntity> {
    return httpClient
      .get(BASE_URL + "/farmer-plot/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err deleteFarmerPlot");
      });
  }
  static getFarmerPlotAll(
    mainStatus: string,
    plantName: number,
    status: string[],
    waitPendingDate: string[],
    page: number,
    take: number,
    sortField?: string,
    sortDirection?: string,
    search?: string
  ): Promise<any> {
    const params = {
      mainStatus: mainStatus,
      plantName: plantName,
      status: status,
      waitPendingDate: waitPendingDate,
      page: page,
      take: take,
      sortField: sortField,
      sortDirection: sortDirection,
      search: search,
    };
    return httpClient
      .get(BASE_URL + "/farmer-plot/farmer-plot-all", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getFarmerPlotAll");
      });
  }
  static getHistoryFarmerPlot(
    farmerId: string,
    farmerPlotId: string,
    page: number,
    take: number
  ): Promise<any> {
    const params = {
      farmerId: farmerId,
      farmerPlotId: farmerPlotId,
      page: page,
      take: take,
    };
    return httpClient
      .get(BASE_URL + "/history-farmer-plot/get-history", { params })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err getHistoryFarmerPlot");
      });
  }
  static updateHistoryFarmerPlot(data: HistoryEditRaiEntity): Promise<any> {
    return httpClient
      .post(BASE_URL + "/history-farmer-plot/edit-rai" , data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err, "err updateFarmerPlot");
      });
  }
}

import { httpClient, BASE_URL } from "../config/develop-config";
import { FarmerPlotEntity } from "../entities/FarmerPlotEntities";


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
}

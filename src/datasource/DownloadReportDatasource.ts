import axios from "axios";
import { BASE_URL } from "../config/develop-config";
export class DownloadReportDatasource {
  static reportPDF(taskId: string[]) {
    const params = {
        taskId: taskId
    }
    return axios
      .post(BASE_URL + `/tasks/report-document/report-pdf`, params)
      .then((response) => {
        return response.data;
      });
  }
}

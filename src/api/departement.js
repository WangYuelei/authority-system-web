import http from "@/utils/request";

export default {
  /**
   * 查询部门列表
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getDepartmentList(params) {
    return await http.get("api/department/list", params);
  }
}

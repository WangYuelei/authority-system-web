import http from "@/utils/request";

export default {
  /**
   * 查询部门列表
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getDepartmentList(params) {
    return await http.get("api/department/list", params);
  },
  /**
   * 获取所属部门列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getParentTreeList() {
    return await http.get("api/department/parent/list",null)
  },
  /**
   * 新增部门
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async add(params){
    return await http.post("api/department/add",params)
  }
}

import http from "@/utils/request"
export default {
  /**
   * 查询菜单列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getMenuList(params){
    return await http.get("/api/permission/list",params);
  }
}

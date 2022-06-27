import http from "@/utils/request"
export default {
  /**
   * 查询菜单列表
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getMenuList(params){
    return await http.get("/api/permission/list",params);
  },
  /**
   * 获取上级菜单
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getParentMenuList(params){
    return await http.get("/api/permission/parent/list",params)
  },
  /**
   * 添加菜单
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async addMenu(params){
    return await http.post("/api/permission/add",params)
  },
  /**
   * 修改菜单
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async updateMenu(params){
    return await http.put("/api/permission/update",params)
  },
  /**
   * 检查菜单下是否存在子菜单
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  async checkPermission(params){
    return await http.getRestApi("/api/permission/check",params)
  },
  /**
   * 删除菜单
   * @returns
   */
  async deleteById(params) {
    return await http.delete("/api/permission/delete", params);
  }
}

import http from '@/utils/request'
export default {
  /**
   * 查询角色列表
   * @returns
   */
  async getRoleListApi(params) {
    return await http.get("/api/role/list", params);
  }
}

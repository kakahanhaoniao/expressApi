const errorMessge =  require('../config/statusCode')
class PublicUtil {
  page (totaldata, queryData, pageSize, pageNum) {
    let total = totaldata.length
    return {
      statusCode: 2000000,
      message: '获取列表成功',
      data: queryData,
      total,
      pageSize,
      pageNum,
      totalPage: Math.ceil(total/pageSize)
    }
  }

  async list (mongoDb, sort, pageSize, pageNum, query) {
    let skip = pageSize*(pageNum-1)
    try {
      let totaldata = await mongoDb.find(query)
      let queryData = await mongoDb.find(query).sort(sort).skip(skip).limit(pageSize).exec()
      return this.page(totaldata, queryData, pageSize, pageNum)
    } catch (error){
      return this.errorFn(error)
    }
  }

  errorFn (error) {
    return {
      statusCode: 2001002,
      message: `${errorMessge['2001002']}:${error.toString()}`
    }
  }
}

module.exports = new PublicUtil

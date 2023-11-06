class NotFoundError extends Error {
    constructor(entity) {
      super()
      this.name = 'NotFoundError'
      this.message = `${entity} not found`
      this.status = 404
    }
  }
module.exports = NotFoundError
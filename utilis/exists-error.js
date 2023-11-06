class ExistsError extends Error {
    constructor(entity) {
        super();
        this.name = "ExistError";
        this.message = `${entity} already exists`;
        this.status = 409;
    }
}
module.exports = ExistsError;
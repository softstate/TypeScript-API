import UserController from '../controller/user';
import * as httpStatus from 'http-status';

const sendResponse = function (res, statusCode, data) {
    res.status(statusCode).json({
        'result': data
    });
}

class UserRoutes {

    constructor() {}
    getAll(req, res) {
        UserController
            .getAll()
            .then(usuarios => sendResponse(res, httpStatus.OK, usuarios))
            .catch(err => console.error.bind(console, "Erro: " + err));
    }

    getByID(req, res) {
        const id = { _id: req.params.id }
        if (!id) {
            sendResponse(res, httpStatus.OK, 'usuário não encontrado');
        }
        UserController
            .getByID(id)
            .then(user => sendResponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, 'Erro: ' + err));
    }

    create(req, res) {
        const user = req.body;
        UserController
            .create(user)
            .then(user => sendResponse(res, httpStatus.CREATED, "usuário criado com sucesso"))
            .catch(err => console.error.bind(console, 'Erro: ' + err));
    }

    update(req, res) {
        const id = { _id: req.body.id }
        const user = req.body;
        UserController
            .update(id, user)
            .then(user => sendResponse(res, httpStatus.OK, "usuário alterado com sucesso"))
            .catch(err => console.error.bind(console, 'Erro: ' + err));
    }

    delete(req, res) {
        const id = { _id: req.body.id }
        UserController
            .delete(id)
            .then(user => sendResponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, 'Erro: ' + err));
    }
}
export default new UserRoutes();
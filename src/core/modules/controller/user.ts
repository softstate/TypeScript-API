import User from '../models/user';

class UserController {
    constructor() {}

    getAll() {
        return User.find({});
    }

    getByID(id) {
        return User.findById(id);
    }

    create(user) {
        return User.create(user);
    }

    update(id, user) {
        const updateUser = {
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            observacoes: user.observacoes,
            modifiedAt: Date.now
        }
        return User.findByIdAndUpdate(id, updateUser);
    }
    
    delete(id) {
        return User.remove(id);
    }
}
export default new UserController();
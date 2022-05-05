
const validate = function validateItem (...agrs) {
    console.log(agrs)
    if (agrs[0] === undefined) {
        return 'Campo texto obrigatório'
    }
    if (agrs[1] === undefined) {
        return 'Campo texto horario'
    }
    if (agrs[2] === undefined) {
        return 'Campo texto data do evento'
    }
}
module.exports = validate;
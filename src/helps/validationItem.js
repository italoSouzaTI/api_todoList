
const validate = function validateItem (titulo,horario,date_event) {
    if (titulo === undefined || titulo === '') {
        return 'Campo texto obrigatório'
    }
    if (horario === undefined || horario === '') {
        return 'Campo texto horario'
    }
    if (date_event === undefined || date_event === '') {
        return 'Campo texto data do evento'
    }
}
module.exports = validate;
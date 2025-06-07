const schemasValidador = (schema) => {
    return (req, res, next) => {
        const resultado = schema.validate(req.body)
        if (resultado.error) {
            return res.status(400).json({ message: resultado.error.details[0].message })
        }
        next()
    }
}

module.exports = schemasValidador 
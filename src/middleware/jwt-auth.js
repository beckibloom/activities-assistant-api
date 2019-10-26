const AuthService = require('../auth/auth-service')

function requireAuth(req,res,next) {
    const authToken = req.get('Authorization') || ''

    let bearerToken
    if (!authToken.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'Missing bearer token' })
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }

    try {
        const payload = AuthService.verifyJwt(bearerToken)

        AuthService.getUserWithUserName(
            req.app.get('db'),
            payload.sub,
        )
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Unauthorized request, no user found' })
                }

                req.user = user
                res.status(201).json({status:`User found successfully`})
                next()
            })
            .catch(err => {
                console.error(err)
                next(err)
            })
    } catch(error) {
        res.status(401).json({ error: 'Unauthorized request, error' })
    }
}

module.exports = {
    requireAuth,
}
const cookie = process.server ? require('cookie') : undefined

export const actions = {
    async nuxtServerInit({ commit }, { req, res }) {
        // handle auth stuff

        let token = null
        if (req.headers.cookie) {
            const parsed = cookie.parse(req.headers.cookie)
            try {
                token = parsed['token']
            } catch (error) {
                console.log(error)
            }
        }

        if (token !== null && token !== false) {
            await fetch(`${req.protocol}://${req.get("Host")}/auth/me`, {
                headers: {
                    cookie: req.headers.cookie
                }
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.error) {
                        commit('auth/resetUser', null)
                        commit('auth/resetToken', null)
                        res.setHeader('Set-Cookie', [`token=false; expires=Thu, 01 Jan 1970 00:00:00 GMT`])
                    } else {
                        commit('auth/setUser', data)
                        commit('auth/setToken', token)
                    }
                }).catch((error) => {
                    console.warn(error)
                })
        }
    }
}
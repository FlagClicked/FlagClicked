/* 
Reference for this module (all functions are async unless noted):

module auth
  Function auth._newUser
     Params: username <String>
     Returns <User>
  Function auth._updateUser
     Params: username <String> , data <User>
     Returns <void>
  Function auth.getUser
     Params: username <String>
     Returns: <User>
  Function auth.createSession
     Params: Username
     Returns: <User>
  Function auth.getSession
     Params: token <String>
     Returns: <User>
  Function auth.deleteSession
     Params: token <String>
     Returns: <void>
  Function auth.checkIfFluffyResponseValid
     Params: privateCode <Number (can be string)>
     Returns: Username <String>
*/
const crypto = require("crypto")
const fetch = require("node-fetch")
const Database = require("@replit/database")
const db = new Database()

module.exports = {
  _newUser: function(username) {
    // Returns <Promise> which returns <User>. Internal Function
    return new Promise(async (resolve, reject) => {
      var scratchRes = await fetch(`https://api.scratch.mit.edu/users/${username}`).catch(err => {reject(`Scratch Server Error: ${err}`)}).then(res => res.json())

      if (scratchRes && scratchRes.code !== "NotFound") {
        var User = {
          id: scratchRes.id,
          name: scratchRes.username, // needed to get the exact capitalization of the user
          tutorials: 0, // Number of tutorials this user has created
          sessions: [],
        }
        await db.set(`user-${User.name.toLowerCase()}`, User)
        resolve(User)
      } else {
        reject('Invalid/Bad Username')
      }
    })
  },
  _updateUser: async function(username, data) {
    var user = await this.getUser(username)
    for (let j in data) {
      user[j] = data[j]
    }
    return await db.set(`user-${username.toLowerCase()}`, user)
  },

  getUser: async function(username) {
    return await db.get(`user-${username.toLowerCase()}`) || await this._newUser(username)
  },

  createSession: async function(username, tries = 0) {
    var token = crypto.randomBytes(256).toString('hex');
    var old = await db.get(`auth-${token}`)
    if (tries > 10) throw 'Maximum tries reached'
    if (old) return await this.createSession(username, tries + 1)

    var user = await this.getUser(username)

    user.sessions.push(token)

    await db.set(`auth-${token}`, user.name)

    await this._updateUser(username, user)
    return {user: user, token: token}
  },

  getSession: async function(token) {
    var username = await db.get(`auth-${token}`)
    if (username) {
      var user = await this.getUser(username)
      return user
    } else {
      throw "Invalid Token"
    }
  },

  deleteSession: async function(token) {
    var user = await this.getSession(token)

    var ind = user.sessions.indexOf(token)

    user.sessions.splice(ind, 1) // Shouldn't throw anything unless the code is broken

    return await this._updateUser(user.name, user)
  },

  checkIfFluffyResponseValid: async function(privateCode) {
    var resp = await (fetch(`https://fluffyscratch.hampton.pw/auth/verify/v2/${privateCode}`).catch(err => {throw "server error"}).then(res => res.json()))

    if (resp.valid) {
      return resp.username
    } else {
      throw "invalid"
    }
  }
}
const ROLES = require('../config/roles_list')

module.exports = authorize = function(roles, userRole){
    if(roles.includes(ROLES[userRole])){
        console.log("User is authorized")
        return true
    }
    return false
}
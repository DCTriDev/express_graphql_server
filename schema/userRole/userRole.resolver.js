const {getAllUserRole, getUserRoleById, updateUserRole} = require("../../repository/userRole.repository");

const userRoleResolver = {
    Query: {
        userRole: () => {
            return getAllUserRole()
        }
    },
    Mutation: {
        getUserRoleById: (parent, {input}) => {
            return getUserRoleById(input)
        },
        updateUserRole: (parent, {input}) => {
            return updateUserRole(input)
        }
    }
}

module.exports = userRoleResolver;

const {getAllRole, insertRole} = require("../../repository/role.repository");

const roleResolver = {
    Query: {
        role: () => {
            return getAllRole()
        }
    },

    Mutation: {
        addRole: (parent, {input}) => {
            return insertRole(input)
        }
    }
}

module.exports = roleResolver;

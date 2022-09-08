const insertUserSchema = (_username, _password, _fullName, _email, _phoneNumber, _birthday, _genderId) => {
    const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360'
    return {
        include: {
            userRole: true,
            profile: true,
            accountBalance: true,
        },
        data: {
            username: _username.toLowerCase(),
            password: _password,
            profile: {
                create: {
                    fullName: _fullName,
                    email: _email,
                    avatar: defaultAvatar,
                    phoneNumber: _phoneNumber,
                    birthday: new Date(+_birthday),
                    genderId: _genderId,
                },
            },
            userRole: {
                create: {
                    roleId: 2, // 1 for admin, 2 is for user
                },
            },
            accountBalance: {
                create: {
                    balance: 50, // Default 50$
                },
            },
        },
    }
}

module.exports = {
    insertUserSchema,
}

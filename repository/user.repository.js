const {PrismaClient} = require('@prisma/client')
const {insertUserSchema} = require('../query/user.query')
const {generateToken, verifyAdmin, decodeToken} = require('../helper/jwt.helper')
const {generateHashPassword, verifyPassword} = require('../helper/bcrypt.helper')
const APIError = require('../helper/api.helper')
const prisma = new PrismaClient()

const getAllUser = async (accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const data = await prisma.user.findMany({
                include: {
                    profile: true,
                    userRole: {
                        include: {
                            role: true,
                        },
                    },
                },
            })
            return data.map((item) => {
                return {
                    ...item,
                    fullName: item.profile.fullName,
                    avatar: item.profile.avatar,
                    email: item.profile.email,
                    phoneNumber: item.profile.phoneNumber,
                    birthday: item.profile.birthday,
                    roleName: item.userRole.role.roleName,
                    genderId: item.profile.genderId,
                }
            })
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        console.log(e)
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const signup = async (input) => {
    const {username, password, fullName, email, phoneNumber, birthday, genderId} = input
    const hashPassword = generateHashPassword(password)

    try {
        await prisma.user.create(
            insertUserSchema(username, hashPassword, fullName, email, phoneNumber, birthday, genderId)
        )
        return {
            username: username,
            password: password,
            roleName: 'USER',
        }
    } catch (e) {
        console.log(e)
        if (e.code === 'P2002') {
            switch (e.meta.target[0]) {
                case 'username':
                    return new APIError({status: 400, message: 'Username is already exist. Please try another one!'})
                case 'phoneNumber':
                    return new APIError({
                        status: 400,
                        message: 'Phone number is already exist. Please try another one!',
                    })
                case 'email':
                    return new APIError({status: 400, message: 'Email is already exist. Please try another one!'})
                default:
                    return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
            }
        }
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const login = async (input) => {
    const {username, password} = input
    try {
        const userData = await prisma.user.findUnique({
            where: {
                username: username.toLowerCase(),
            },
            include: {
                userRole: {
                    include: {
                        role: true,
                    },
                },
                profile: true,
            },
        })

        if (userData) {
            const userInfo = {
                userId: userData.id,
                username: userData.username,
                password: userData.password,
                fullName: userData.profile.fullName,
                avatar: userData.profile.avatar,
                birthday: userData.profile.birthday,
                email: userData.profile.email,
                phoneNumber: userData.profile.phoneNumber,
                roleName: userData.userRole.role.roleName,
            }

            const isSuccess = verifyPassword(password, userInfo.password)
            if (isSuccess) {
                const accessToken = generateToken(userInfo)
                return {
                    ...userInfo,
                    accessToken,
                }
            } else {
                throw new APIError({status: 404, message: 'Password is incorrect. Please try again.'})
            }
        } else {
            throw new APIError({status: 404, message: 'Username is not exist. Please sign up first or try again.'})
        }
    } catch (error) {
        return new APIError({status: 404, message: error.message || 'Login failed. Please try again.'})
    } finally {
        await prisma.$disconnect()
    }
}

const updateUserAdmin = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {id, fullName, email, avatar, phoneNumber, birthday, genderId, roleName} = input

            const roleIdData = await prisma.role.findUnique({
                where: {
                    roleName,
                },
            })

            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    profile: {
                        update: {
                            fullName,
                            email,
                            phoneNumber,
                            birthday: new Date(+birthday),
                            avatar,
                            genderId,
                        },
                    },
                    userRole: {
                        update: {
                            roleId: roleIdData.id,
                        },
                    },
                },
                include: {
                    profile: true,
                    userRole: true,
                },
            })
            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        if (e.code === 'P2002') {
            switch (e.meta.target[0]) {
                case 'email':
                    return new APIError({status: 400, message: 'Email is already exist. Please try another one!'})
                case 'phoneNumber':
                    return new APIError({
                        status: 400,
                        message: 'Phone number is already exist. Please try another one!',
                    })
                default:
                    return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
            }
        }
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const deleteUserAdmin = async (input, accessToken) => {
    try {
        const isAdmin = verifyAdmin(accessToken)
        if (isAdmin.status) {
            const {id} = input

            const deleteAccountBalance = prisma.accountBalance.deleteMany({
                where: {
                    userId: id,
                },
            })

            const deleteUserRole = prisma.userRole.deleteMany({
                where: {
                    userId: id,
                },
            })

            const deleteProfile = prisma.profile.deleteMany({
                where: {
                    userId: id,
                },
            })

            const deletePurchasedMovie = prisma.purchasedMovie.deleteMany({
                where: {
                    userId: id,
                },
            })

            const deleteUser = prisma.user.delete({
                where: {
                    id,
                },
            })

            await prisma.$transaction([
                deleteAccountBalance,
                deleteUserRole,
                deleteProfile,
                deletePurchasedMovie,
                deleteUser,
            ])

            return {
                status: true,
            }
        }
        throw new APIError({status: isAdmin.statusCode, message: isAdmin.message})
    } catch (e) {
        if (e.code === 'P2025') {
            return new APIError({status: 400, message: "User doesn't exits. Please try again!"})
        }
        return new APIError({status: 400, message: 'Something went wrong. Please try again!'})
    } finally {
        await prisma.$disconnect()
    }
}

const getUserInfo = async (accessToken) => {
    try {
        const decoded = decodeToken(accessToken)
        if (decoded.status) {
            const {userId} = decoded.data
            const userData = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    profile: true,
                    userRole: true,
                    accountBalance: true,
                    purchasedMovie: {
                        include: {
                            movie: true,
                        },
                    },
                },
            })
            return {
                username: userData.username,
                avatar: userData.profile.avatar,
                fullName: userData.profile.fullName,
                email: userData.profile.email,
                phoneNumber: userData.profile.phoneNumber,
                birthday: userData.profile.birthday,
                genderId: userData.profile.genderId,
                balance: userData.accountBalance.balance,
                purchasedMovie: userData.purchasedMovie.map((movie) => movie.movie),
            }
        }
        throw new APIError({status: 403, message: decoded.message})
    } catch (e) {
        return e
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {
    getAllUser,
    signup,
    login,
    updateUserAdmin,
    deleteUserAdmin,
    getUserInfo,
}

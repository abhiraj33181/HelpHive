const isProduction = process.env.NODE_ENV === 'production'

export const buildCookieOptions = () => ({
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    path: '/',
    expires: new Date(Date.now() + 24 * 7 * 60 * 60 * 1000)
})

export const buildClearCookieOptions = () => ({
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
    path: '/'
})
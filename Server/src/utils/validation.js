
// Edit Profile 
export const isEditProfile = async (req,res) => {
    const editAllowed = [
        'fullName',
        'mobile',
        'address',
        'city',
        'profilePicture'
    ]

    const isEditAllowed = Object.keys(req.body).every(field => {
        editAllowed.includes(field)
    })

    return isEditAllowed
}
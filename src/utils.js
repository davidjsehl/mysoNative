export const getChatMessages = (data) => {
    return data ? Object.keys(data).map(key => data[key]) : []
}
export const getCompletedEndDate = (date) => {
    return new Date(date) < new Date()
}
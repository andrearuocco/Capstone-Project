export const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0 // evita la divisione per zero
    const sum = ratings.reduce((a, b) => a + b, 0)
    return parseFloat((sum / ratings.length).toFixed(1)) // media con una cifra decimale
}
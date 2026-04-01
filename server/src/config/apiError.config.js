export const apiError = ({ status = 500, message = 'Something went wrong', error }) => {
    const result = {
        status,
        message,
        error,
        success: status < 300
    }

    console.log(result);

    return result
}
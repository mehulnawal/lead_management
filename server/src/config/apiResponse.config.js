export const apiResponse = ({ status = 200, message, data = null }) => {
    const result = {
        status,
        message,
        data,
        success: status < 300
    }

    console.log(result);

    return result
}
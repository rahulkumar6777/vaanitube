import DevLoad from "devload";

export const deleteFromDevload = async (fileid) => {
    try {
        const devload = new DevLoad(process.env.DEVLOAD_API_KEY);
        const response = await devload.deleteFile(fileid)
        return response;
    } catch (error) {
        return null;
    }
}
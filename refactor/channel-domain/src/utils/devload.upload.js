import DevLoad from "devload";

export const uploadToDevload = async (localFilePath) => {
    try {
        const devload = new DevLoad(process.env.DEVLOAD_API_KEY);
        const projectid = process.env.DEVLOAD_PROJECT_ID;
        const response = await devload.uploadFile(projectid, localFilePath)
        return response;
    } catch (error) {
        return null;
    }
}
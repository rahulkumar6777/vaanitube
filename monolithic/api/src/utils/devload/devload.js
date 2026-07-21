import Devload from 'devload';
import { AppError } from '../errors/AppError.js';
import { envs } from '../../lib/env.js';

const devload = new Devload(envs.DEVLOAD_API_KEY);
const projectid = envs.DEVLOAD_PROJECT_ID;


export const uploadOnDevload = async (files) => {

    try {

        let uplaodResult = []
        for (const file of files) {
            const res = await devload.uploadFile(projectid, file.path)
            uplaodResult.push(res);
        }

        return uplaodResult;
    } catch (error) {
        console.log(error)
        throw new AppError('upload Filed! Please Try Again Later', 500)
    }

}

export const deleteFromDevload = async (fileId) => {
    try {
        const deleteResult = await devload.deleteFile(fileId);
        console.log('File deleted:', deleteResult);
    } catch (error) {
        throw new AppError('Delete Failed', 500)
    }
}
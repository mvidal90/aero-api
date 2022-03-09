const Jimp = require("jimp");

export const imgConvert = async(imgUrl: string) => {
    return new Promise(async (resolve, reject) => {
        await Jimp.read(imgUrl, async (err: any, image: any) => {
            if (err) {
                reject(err);
            }
            await image
                .getBase64(Jimp.MIME_PNG, function (err: any, src: string) {
                    if (err) {
                        reject(err);
                    }
                    resolve(src);
                })
        })
    })
}
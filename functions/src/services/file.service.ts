import {Connections} from "../utils/connections";
import {uuid} from 'uuidv4';

export class FileService {

    public static async getImageLink(filePromise: Promise<any>, extension: string, mimeType: string) {
        if (!filePromise) {
            return null;
        }

        const image = await filePromise;

        const filename = uuid() + extension;

        const file = Connections.avatarBucket().bucket().file(filename);

        await file.save(image, {
          metadata: {
            contentType: mimeType,
          },
          public: true,
        });

        return `https://storage.googleapis.com/play-the-city.appspot.com/${filename}`;
    }

}

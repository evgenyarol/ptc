import { Storage } from '@google-cloud/storage'

const storage = new Storage({
    keyFilename: "../../serviceAccountKey.json",
 });

let bucketName = "play-the-city.appspot.com/"

let filename = './image.png';
export class UploadFile {
  public static async uploadFile () {

  // Uploads a local file to the bucket
  await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: 'public, max-age=31536000',
      },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

}
// Testing out upload of file


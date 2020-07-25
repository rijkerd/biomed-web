import aws from 'aws-sdk';

const config = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  region: 'us-west-2',
};

const downloadImage = (url) => {
  const urlArray = url.split('/');
  const bucket = urlArray[3];
  const key = `${urlArray[4]}/${urlArray[5]}`;
  const s3 = new aws.S3(config);
  const params = { Bucket: bucket, Key: key };
  s3.getObject(params, (err, data) => {
    if (err) {
      throw Error(err);
    }
    /* eslint-disable */
    const blob = new Blob([data.Body], { type: data.ContentType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    /* eslint-enable */
    link.download = url;
    link.click();
  });
};

export default downloadImage;

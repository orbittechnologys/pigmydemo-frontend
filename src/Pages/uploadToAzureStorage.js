import { BlobServiceClient } from "@azure/storage-blob";

const uploadToAzureStorage = async (file, folderName, blobName) => {
  console.log(file);

  const storageAccount = "unionstorageaccount";
  const containerName = "unioncontainer";
  const sasURL =
    "https://unionstorageaccount.blob.core.windows.net/unioncontainer?sp=racwdli&st=2025-01-02T08:33:51Z&se=2030-01-01T16:33:51Z&sv=2022-11-02&sr=c&sig=Uouh4W3tGouHzvieYY4jb0SyQiDUR%2BbXWoItlrF8TMA%3D";

  const uploadUrl = sasURL;

  console.log(uploadUrl);

  const blobService = new BlobServiceClient(uploadUrl);

  console.log(blobService);

  const containerClient = blobService.getContainerClient(folderName); // Folder name

  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  console.log(blobClient);

  // upload file
  await blobClient.uploadData(file, options);

  const url = blobClient.url;
  console.log("File uploaded successfully. URL:", url);

  const imageUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${folderName}/${file.name}`;

  return imageUrl;
};

export default uploadToAzureStorage;

import Resizer from "react-image-file-resizer";

export const resizeFileImg = (params: {
  file: Blob;
  maxWidth: number;
  maxHeight: number;
  compressFormat: string;
  quality: number;
  rotation: number;
  responseUriFunc: (
    value: string | Blob | File | ProgressEvent<FileReader>
  ) => void;
  outputType?: string;
  minWidth?: number;
  minHeight?: number;
}): Promise<string | Blob | File | ProgressEvent<FileReader>> => {
  const outPutType = params.outputType ? params.outputType : "blob";
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      params.file,
      params.maxWidth,
      params.maxHeight,
      params.compressFormat,
      params.quality,
      params.rotation,
      (uri) => {
        params.responseUriFunc(uri);
        resolve(uri);
      },
      outPutType,
      params.minWidth,
      params.minHeight
    );
  });
};

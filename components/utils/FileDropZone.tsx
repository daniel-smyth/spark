import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

export const FileDropZone = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }: { meta: any }) => {
    return { url: "https://httpbin.org/post" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = (
    { meta, file }: { meta: any; file: any },
    status: any
  ) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files: any[]) => {
    console.log(files.map((f) => f.meta));
  };

  return (
    <Dropzone
      inputContent="Upload images"
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  );
};

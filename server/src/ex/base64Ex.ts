export const _blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const { result } = reader;
      if (typeof result === "string") {
        res(result);
      } else {
        rej(new Error("readAsDataURL 결과값이 string이 아님"));
      }
    };
    reader.readAsDataURL(blob);
  });
};

export const fileToBase64 = async (file: File): Promise<string> => {
  const dataUri = await _blobToBase64(file);
  return dataUri.split(",")[1] ?? "";
};

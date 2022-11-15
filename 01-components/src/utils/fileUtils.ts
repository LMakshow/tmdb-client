//https://developer.mozilla.org/ru/docs/Web/HTML/Element/Input/file
export default function validFileType(file: File, fileTypes: string[]) {
  for (let i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }

  return false;
}

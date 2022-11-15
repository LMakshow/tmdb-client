export const stabStringFromCheckboxes = (stabOptical: boolean, stabMatrix: boolean) => {
  if (stabOptical && stabMatrix) return 'optical, matrix';
  if (stabOptical) return 'optical';
  if (stabMatrix) return 'matrix';
  return 'none';
};

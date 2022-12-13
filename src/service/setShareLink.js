import copy from 'clipboard-copy';

const setShareLink = (setShowCopyMessage) => {
  copy(window.location.href);
  setShowCopyMessage(true);
  const fiveSeconds = 5000;
  setTimeout(() => {
    setShowCopyMessage(false);
  }, fiveSeconds);
};
export default setShareLink;

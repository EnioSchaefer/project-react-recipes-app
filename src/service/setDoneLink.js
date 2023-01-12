import copy from 'clipboard-copy';

const handleClick = ({ target }, setShowCopyMessage) => {
  copy(`http://localhost:3000/${target.name}s/${target.id}`);
  setShowCopyMessage(true);
  // const fiveSeconds = 5000;
  // setTimeout(() => {
  //   setShowCopyMessage(false);
  // }, fiveSeconds);
};
export default handleClick;

import copy from 'clipboard-copy';

const shareLink = (type, id) => copy(`http://localhost:3000/${type}s/${id}`);

export default shareLink;

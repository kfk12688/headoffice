function getFromURIFragment(queryString) {
  const params = {};
  const regex = /([^&=]+)=([^&]*)/g;
  let m;
  while (m) {
    m = regex.exec(queryString);
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
}

export default getFromURIFragment;

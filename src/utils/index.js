export const getLocation = href => {
    var l = document.createElement("a");
    l.href = href;
    return l;
};


export const cutString = (str, len) => {
  if(str.length > len){
    return str.slice(0, len) + '...';
  }
  return str;
}

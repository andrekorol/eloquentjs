function byTagName(node, tagName) {
  const resultNodes = [];
  function getMatchingNodes(parentNode) {
    if (parentNode.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < parentNode.childNodes.length; i++) {
        getMatchingNodes(parentNode.childNodes[i]);
      }
      if (parentNode.nodeName.toLowerCase() === tagName) {
        resultNodes.push(parentNode);
      }
    }
  }
  getMatchingNodes(node);
  return resultNodes;
}

console.log(byTagName(document.body, 'h1').length);
// → 1
console.log(byTagName(document.body, 'span').length);
// → 3
const para = document.querySelector('p');
console.log(byTagName(para, 'span').length);
// → 2

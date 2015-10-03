function getParentIndex(index) {
  return Math.floor(index * 0.5);
}

function getSiblings(tree, level, index) {
  var nodes = tree.level(level);
  var siblings = {};

  if (index % 2) {
    siblings.left = nodes[index - 1];
    siblings.right = nodes[index];
  } else {
    siblings.left = nodes[index];
    if (index < nodes.length - 1) {
      siblings.right = nodes[index + 1];
    }
  }

  siblings.parent = tree.level(level - 1)[getParentIndex(index)];

  return siblings;
}

module.exports = function getMerkleProof(tree, leafIndex) {
  var index = leafIndex;
  var proof = [];

  for (var level = tree.depth(); level > 0; level--) {
    proof.push(getSiblings(tree, level, index));
    index = getParentIndex(index);
  }

  return proof;
};

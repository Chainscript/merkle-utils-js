var crypto = require('crypto');

module.exports = function verifyMerkleProof(proof, target, root, hashFuncName) {
  var hash = target.toUpperCase();

  for (var level = 0; level < proof.length; level++) {
    var proofLevel = proof[level];

    if (hash !== proofLevel.left && hash !== proofLevel.right) {
      return false;
    }

    if (proofLevel.right) {
      var parent = crypto
        .createHash(hashFuncName)
        .update(proofLevel.left)
        .update(proofLevel.right)
        .digest('hex')
        .toUpperCase();
    } else {
      parent = proofLevel.left;
    }

    if (proofLevel.parent !== parent) {
      return false;
    }

    hash = parent;
  }

  return hash === root;
};

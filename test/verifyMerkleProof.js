var should = require('should');
var merkle = require('merkle');
var getMerkleProof = require('../lib/getMerkleProof');
var verifyMerkleProof = require('../lib/verifyMerkleProof');

describe('verifyMerkleProof()', function() {
  var tree = merkle('sha256').sync(['a', 'b', 'c', 'd', 'e']);

  it('should return true if the proof is valid', function() {
    for (var i = 0; i < 5; i ++) {
      verifyMerkleProof(
        getMerkleProof(tree, i),
        tree.level(3)[i],
        tree.root(),
        'sha256'
      ).should.be.exactly(true);
    }
  });

  it('should return false if a parent is invalid', function() {
    var proof = getMerkleProof(tree, 0);
    proof[0].parent = 'ZERTYUIO';
    verifyMerkleProof(
      proof,
      tree.level(3)[0],
      tree.root(),
      'sha256'
    ).should.be.exactly(false);
  });

  it('should return false if target is invalid', function() {
    var proof = getMerkleProof(tree, 0);
    verifyMerkleProof(
      proof,
      'ERTYUILM',
      tree.root(),
      'sha256'
    ).should.be.exactly(false);
  });

  it('should return false if root is invalid', function() {
    var proof = getMerkleProof(tree, 0);
    verifyMerkleProof(
      proof,
      tree.level(3)[0],
      'AZERTYUIO',
      'sha256'
    ).should.be.exactly(false);
  });

});

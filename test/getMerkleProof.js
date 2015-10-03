var should = require('should');
var merkle = require('merkle');
var getMerkleProof = require('../lib/getMerkleProof');

describe('getMerkleProof()', function() {
  var tree = merkle('sha256').sync(['a', 'b', 'c', 'd', 'e']);

  it('should work for odd leafs', function() {
    getMerkleProof(tree, 0).should.deepEqual([{
      left: tree.level(3)[0],
      right: tree.level(3)[1],
      parent: tree.level(2)[0]
    }, {
      left: tree.level(2)[0],
      right: tree.level(2)[1],
      parent: tree.level(1)[0]
    }, {
      left: tree.level(1)[0],
      right: tree.level(1)[1],
      parent: tree.root()
    }]);
  });

  it('should work for even leafs', function() {
    getMerkleProof(tree, 3).should.deepEqual([{
      left: tree.level(3)[2],
      right: tree.level(3)[3],
      parent: tree.level(2)[1]
    }, {
      left: tree.level(2)[0],
      right: tree.level(2)[1],
      parent: tree.level(1)[0]
    }, {
      left: tree.level(1)[0],
      right: tree.level(1)[1],
      parent: tree.root()
    }]);
  });

  it('should work for the last even leafs', function() {
    getMerkleProof(tree, 4).should.deepEqual([{
      left: tree.level(3)[4],
      parent: tree.level(2)[2]
    }, {
      left: tree.level(2)[2],
      parent: tree.level(1)[1]
    }, {
      left: tree.level(1)[0],
      right: tree.level(1)[1],
      parent: tree.root()
    }]);
  });
});

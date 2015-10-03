# Merkle Utils

## Install

```bash
npm install --save merkle
npm install --save merkle-utils
```

## API

### getMerkleProof(tree, leafIndex)

Get merkle proof of tree for the leaf at specified index.

Ex:

```js
var merkle = require('merkle');
var getMerkleProof = require('merkle-utils').getMerkleProof;

var tree = merkle('sha256').sync(['a', 'b', 'c', 'd', 'e']);

getMerkleProof(tree, 3);

```

Ouput:

```js
[
	{
		left: '2E7D2C03A9507AE265ECF5B5356885A53393A2029D241394997265A1A25AEFC6',
		right: '18AC3E7343F016890C510E93F935261169D9E3F565436429830FAF0934F4F8E4',
		parent: 'A99E82F486656840A790C0EF6024D2C02359DE7674A587562FEB81C8970F24DD'
	},
	{
		left: '6A20F2EE7789E6BB7F404CC2DD729FF308B724D904F6A455B74D4851ADE5AECB',
		right: 'A99E82F486656840A790C0EF6024D2C02359DE7674A587562FEB81C8970F24DD',
		parent: 'AB4587D9F4AD6990E0BF4A1C5A836C78CCE881C2B7C4287C0A7DA15B47B8CF1F'
	},
	{
	  	left: 'AB4587D9F4AD6990E0BF4A1C5A836C78CCE881C2B7C4287C0A7DA15B47B8CF1F',
		right: '3F79BB7B435B05321651DAEFD374CDC681DC06FAA65E374E38337B88CA046DEA',
		parent: '16E6BEB3E080910740A2923D6091618CAA9968AEAD8A52D187D725D199548E2C'
	}
]
```

### verifyMerkleProof(proof, target, root, hashFuncName)

Verifies a merkle proof.

Ex:

```js
var merkle = require('merkle');
var getMerkleProof = require('merkle-utils').getMerkleProof;
var verifyMerkleProof = require('merkle-utils').verifyMerkleProof;

var tree = merkle('sha256').sync(['a', 'b', 'c', 'd', 'e']);
var proof = getMerkleProof(tree, 2);

verifyMerkleProof(proof, tree.level(3)[2], tree.root(), 'sha256'); // true
```

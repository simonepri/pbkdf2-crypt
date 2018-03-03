import test from 'ava';

import m from '.';

test('should hash and verify a short password', async t => {
  const password = 'p';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  const match = await m.verify(hash, password);
  t.true(match);
});

test('should hash and verify a long password', async t => {
  const password =
    '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  const match = await m.verify(hash, password);
  t.true(match);
});

test('should verify a precomputed hash', async t => {
  // Precomputed hash for "Hello World"
  const hash =
    '2Fn23T9gcEFwI4oxq/QLxHHn1AQ8YpnXerFxIclftM5oZgzlhOMySBbbdehW2vbgcXp+yx6/tq4ef2SxIF4T1FPs9jpP4Dq7/JIT8TAAw0fqD1gSYoeXDAs/J48KbTL1c5V1LuP+00A39kgFenSDNJkQHigsYsrSSSRCav8ZhJ0=,fyptYghOHA029XTDRrpc7macAHS49dHr9NJNqVUYcJhKW2/kUdy6edysOZ2ad7vLPGviaL0Dq/pmM0mGpZ+i5XwST3CEHA7LAz9+Xyj18In8/pPqsran9ikc4XNiAIJuWoPkQavCPiWZ0dqPaGOxBcXy8v4HHWWQJyB+5LZldoo=,10000,128,sha512';

  t.true(await m.verify(hash, 'Hello World'));
});

test('should throw an error with a wrong precomputed hash', async t => {
  // Precomputed hash for "Hello World" with secret and digest swapped
  const hash =
    'sha512,fyptYghOHA029XTDRrpc7macAHS49dHr9NJNqVUYcJhKW2/kUdy6edysOZ2ad7vLPGviaL0Dq/pmM0mGpZ+i5XwST3CEHA7LAz9+Xyj18In8/pPqsran9ikc4XNiAIJuWoPkQavCPiWZ0dqPaGOxBcXy8v4HHWWQJyB+5LZldoo=,10000,128,2Fn23T9gcEFwI4oxq/QLxHHn1AQ8YpnXerFxIclftM5oZgzlhOMySBbbdehW2vbgcXp+yx6/tq4ef2SxIF4T1FPs9jpP4Dq7/JIT8TAAw0fqD1gSYoeXDAs/J48KbTL1c5V1LuP+00A39kgFenSDNJkQHigsYsrSSSRCav8ZhJ0=';

  let err = await t.throws(m.verify(hash, 'Hello World'));
  t.true(err instanceof Error);

  // Precomputed hash for "Hello World" with missing digest
  const wrong =
    '2Fn23T9gcEFwI4oxq/QLxHHn1AQ8YpnXerFxIclftM5oZgzlhOMySBbbdehW2vbgcXp+yx6/tq4ef2SxIF4T1FPs9jpP4Dq7/JIT8TAAw0fqD1gSYoeXDAs/J48KbTL1c5V1LuP+00A39kgFenSDNJkQHigsYsrSSSRCav8ZhJ0=,fyptYghOHA029XTDRrpc7macAHS49dHr9NJNqVUYcJhKW2/kUdy6edysOZ2ad7vLPGviaL0Dq/pmM0mGpZ+i5XwST3CEHA7LAz9+Xyj18In8/pPqsran9ikc4XNiAIJuWoPkQavCPiWZ0dqPaGOxBcXy8v4HHWWQJyB+5LZldoo=,10000,128';

  err = await t.throws(m.verify(wrong, 'Hello World'));
  t.true(err instanceof Error);
});

test('should not be case insensitive', async t => {
  const password = 'sec';

  const hash = await m.hash(password);
  t.true(typeof hash === 'string' && hash.length > 0);

  t.true(await m.verify(hash, 'sec'));

  t.false(await m.verify(hash, 'Sec'));
  t.false(await m.verify(hash, 'sEc'));
  t.false(await m.verify(hash, 'seC'));
  t.false(await m.verify(hash, 'SEc'));
  t.false(await m.verify(hash, 'sEC'));
  t.false(await m.verify(hash, 'SEC'));
});

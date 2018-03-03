/* eslint-disable max-params */
'use strict';

const crypto = require('crypto');
const pify = require('pify');
const tsse = require('tsse');

/**
 * Default configurations used to generate a new hash.
 * @private
 * @type {object}
 */
const defaults = {
  // Minimum number of iterations recommended to ensure data safety,
  // this value changes every year as technology improves.
  iterations: 10000,

  // According to the PBKDF2 standard, the minimum recommended size for the salt
  // is 64 bits
  keylen: 128,

  // SHA-1 is sufficient however, using SHA-256 or SHA-512 has the benefit of
  // significantly increasing the memory requirements, which increases the cost
  // for an attacker wishing to attack use hardware-based password crackers
  // based on GPUs or ASICs.
  digest: 'sha512'
};

/**
 * Generates a cryptographically secure random string for use as a password salt
 * using Node's built-in crypto.randomBytes().
 * @private
 * @param  {number} length The length of the salt to be generated.
 * @return {Promise.<string>} The salt string.
 */
function createSalt(length) {
  return new Promise((resolve, reject) => {
    pify(crypto.randomBytes)(length)
      .then(buff => resolve(buff.toString('base64')))
      .catch(reject);
  });
}

/**
 * Applies a Password-Based Key Derivation Function using Node's built-in
 * crypto.pbkdf2().
 * @private
 * @param  {string} password The password on which to apply the funciton.
 * @param  {string} salt An unique salt string.
 * @param  {string} iterations The number of iterations to compute the derived
 * key.
 * @param  {string} keylen Length of the computed derived key.
 * @param  {number} digest A digest function from the crypto.getHashes() list of
 * supported digest functions.
 * @return {Promise.<string>} The secret string.
 */
function createSecret(password, salt, iterations, keylen, digest) {
  return new Promise((resolve, reject) => {
    pify(crypto.pbkdf2)(password, salt, iterations, keylen, digest)
      .then(buff => resolve(buff.toString('base64')))
      .catch(reject);
  });
}

function encodeHash(hdata) {
  const array = [
    hdata.secret,
    hdata.salt,
    hdata.iterations,
    hdata.keylen,
    hdata.digest
  ];
  const hash = array.join(',');
  return hash;
}

function decodeHash(hash) {
  const array = hash.split(',');
  if (array.length !== 5) {
    throw new Error('The hash provided is not in the format "secret,salt,iterations,keylen,digest"');
  }
  const hdata = {
    secret: array[0],
    salt: array[1],
    iterations: parseInt(array[2], 10),
    keylen: parseInt(array[3], 10),
    digest: array[4]
  };
  return hdata;
}

/**
 * Computes the secure hash string of the given password.
 * @public
 * @param  {string} password The password to hash.
 * @param  {object} [options] Configurations related to the hashing function.
 * @param  {number} [options.iterations] The number of iterations to compute the
 * derived key.
 * @param  {number} [options.keylen] Length of the computed derived key.
 * @param  {number} [options.digest] A digest function from the
 * crypto.getHashes() list of supported digest functions.
 * @returns {Promise<string>} The generated secure hash string.
 */
function hash(password, options) {
  options = options || {};
  const hdata = {
    iterations: options.iterations || defaults.iterations,
    keylen: options.keylen || defaults.keylen,
    digest: options.digest || defaults.digest
  };

  return new Promise((resolve, reject) => {
    createSalt(hdata.keylen)
      .then(salt => {
        hdata.salt = salt;
        createSecret(password, hdata.salt, hdata.iterations, hdata.keylen, hdata.digest)
          .then(secret => {
            hdata.secret = secret;
            const hash = encodeHash(hdata);
            resolve(hash);
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

/**
 * Determines whether or not the user's input matches the secure hashed password.
 * @public
 * @param  {string} hash Secure hash string generated from this package.
 * @param  {string} input User's password input.
 * @returns {Promise<boolean>} A boolean that is true if the hash computed
 * for the input matches.
 */
function verify(hash, password) {
  return new Promise((resolve, reject) => {
    let hdata;
    try {
      hdata = decodeHash(hash);
    } catch (err) {
      return reject(err);
    }

    createSecret(password, hdata.salt, hdata.iterations, hdata.keylen, hdata.digest)
      .then(secret => {
        const match = tsse(secret, hdata.secret);
        resolve(match);
      })
      .catch(reject);
  });
}

module.exports = {
  hash,
  verify
};

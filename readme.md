<h1 align="center">
  <b>pbkdf2-crypt</b>
</h1>
<p align="center">
  <!-- CI - TravisCI -->
  <a href="https://travis-ci.org/simonepri/pbkdf2-crypt">
    <img src="https://img.shields.io/travis/simonepri/pbkdf2-crypt/master.svg?label=MacOS%20%26%20Linux" alt="Mac/Linux Build Status" />
  </a>
  <!-- CI - AppVeyor -->
  <a href="https://ci.appveyor.com/project/simonepri/pbkdf2-crypt">
    <img src="https://img.shields.io/appveyor/ci/simonepri/pbkdf2-crypt/master.svg?label=Windows" alt="Windows Build status" />
  </a>
  <!-- Coverage - Codecov -->
  <a href="https://codecov.io/gh/simonepri/pbkdf2-crypt">
    <img src="https://img.shields.io/codecov/c/github/simonepri/pbkdf2-crypt/master.svg" alt="Codecov Coverage report" />
  </a>
  <!-- DM - Snyk -->
  <a href="https://snyk.io/test/github/simonepri/pbkdf2-crypt?targetFile=package.json">
    <img src="https://snyk.io/test/github/simonepri/pbkdf2-crypt/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
  </a>
  <!-- DM - David -->
  <a href="https://david-dm.org/simonepri/pbkdf2-crypt">
    <img src="https://david-dm.org/simonepri/pbkdf2-crypt/status.svg" alt="Dependency Status" />
  </a>

  <br/>

  <!-- Code Style - XO-Prettier -->
  <a href="https://github.com/xojs/xo">
    <img src="https://img.shields.io/badge/code_style-XO+Prettier-5ed9c7.svg" alt="XO Code Style used" />
  </a>
  <!-- Test Runner - AVA -->
  <a href="https://github.com/avajs/ava">
    <img src="https://img.shields.io/badge/test_runner-AVA-fb3170.svg" alt="AVA Test Runner used" />
  </a>
  <!-- Test Coverage - Istanbul -->
  <a href="https://github.com/istanbuljs/nyc">
    <img src="https://img.shields.io/badge/test_coverage-NYC-fec606.svg" alt="Istanbul Test Coverage used" />
  </a>
  <!-- Release System - np -->
  <a href="https://github.com/sindresorhus/np">
    <img src="https://img.shields.io/badge/release_system-np-6c8784.svg" alt="NP Release System used" />
  </a>

  <br/>

  <!-- Version - npm -->
  <a href="https://www.npmjs.com/package/pbkdf2-crypt">
    <img src="https://img.shields.io/npm/v/pbkdf2-crypt.svg" alt="Latest version on npm" />
  </a>
  <!-- License - MIT -->
  <a href="https://github.com/simonepri/pbkdf2-crypt#license">
    <img src="https://img.shields.io/github/license/simonepri/pbkdf2-crypt.svg" alt="Project license" />
  </a>
</p>
<p align="center">
  🔒 Cryptographically secure password hashing algorithm based on pbkdf2 key derivation function.

  <br/>

  <sub>
    Coded with ❤️ by <a href="#authors">Simone Primarosa</a>.
  </sub>
</p>

## Install

```bash
npm install --save pbkdf2-crypt
```

## Usage
```js
const pbkdf2c = require('pbkdf2-crypt');

// Hash and verify with pbkdf2 and default configs
pbkdf2c.hash('We are all unicorns')
  .then(hash) => {

    console.log(hash);
    //=> "mOyc16tOzjyRlVwE0UknfYLkWhboVaepNDSlpXGsgVIjmV3ATpMgbUkvtAQVuGWYX8499ta+qTSwMS5mShHrPEMR1w/JRa3TiOYRK6D7K7Q0JhFkp83suUKaO2qqXf7XXlbeEQjEHyxXOQejKBxhbl7vdlgQcUnsovCtEhOesD0=,B1izIvz3r4CKWswSeWh11ClEVrXxs/2jDD0LGSUMar/KQyBI6x4CfkcnsC4WHU29Meew8aQYyURwS8tjP7N+tMM1NhM1FDnWH0766noazbVd1rNG8IHoroD8v0jQcHYTRth2pviQaoJszKcLP43XT+c9DNYolDXzeKQAPZ3+mI0=,10000,128,sha512"

    pbkdf2c.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });

// Hash and verify with pbkdf2 and custom configs
pbkdf2c.hash('We are all unicorns', {digest: 'sha1', iterations: 15000})
  .then(hash) => {

    console.log(hash);
    //=> "suaEhih1LNHXbcWMc7lzdY7z0F3bVbVvuIGr7kAMCPNQ9vGsIhQWL//GIdZ4NNLs8n7rNkRFYHzEqBjl+GgzSQ==,T82zIg2ej8IOYBqqlGOtduKVFUUMras1eJ1U1khGTfeP1caP3jAozGQqS149Pynq9PlEGP0hhMOsywrKj97VUw==,7500,64,sha1"

    pbkdf2c.verify(hash, 'We are all unicorns')
      .then(match) => {
        console.log(match);
        //=> true
      });

  });
```

# API

<dl>
<dt><a href="#hash">hash(password, [options])</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Computes the secure hash string of the given password.</p>
</dd>
<dt><a href="#verify">verify(hash, input)</a> ⇒ <code>Promise.&lt;boolean&gt;</code></dt>
<dd><p>Determines whether or not the user&#39;s input matches the secure hashed password.</p>
</dd>
</dl>

<a name="hash"></a>

## hash(password, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Computes the secure hash string of the given password.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - The generated secure hash string.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | The password to hash. |
| [options] | <code>object</code> | Configurations related to the hashing function. |
| [options.iterations] | <code>number</code> | The number of iterations to compute the derived key. |
| [options.keylen] | <code>number</code> | Length of the computed derived key. |
| [options.digest] | <code>number</code> | A digest function from the crypto.getHashes() list of supported digest functions. |

<a name="verify"></a>

## verify(hash, input) ⇒ <code>Promise.&lt;boolean&gt;</code>
Determines whether or not the user's input matches the secure hashed password.

**Kind**: global function  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - A boolean that is true if the hash computed
for the input matches.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>string</code> | Secure hash string generated from this package. |
| input | <code>string</code> | User's password input. |

## Contributing
Contributions are REALLY welcome and if you find a security flaw in this code, PLEASE [report it](https://github.com/simonepri/pbkdf2-crypt/issues/new).  
Please check the [contributing guidelines](.github/contributing.md) for more details. Thanks!

## Authors
- **Simone Primarosa** -  *Follow* me on *Github* ([:octocat:@simonepri](https://github.com/simonepri)) and on  *Twitter* ([🐦@simonepri](http://twitter.com/intent/user?screen_name=simoneprimarosa))

See also the list of [contributors](https://github.com/simonepri/pbkdf2-crypt/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/simonepri/pbkdf2-crypt/LICENSE) file for details.

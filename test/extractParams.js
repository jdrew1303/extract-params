var expect = require('chai').expect;
var extractParams = require('../lib/extractParams');

var testCases = [
  {
    should: 'return null if there is no match',
    str: 'everyone-knows-that-elm-is-awesome',
    pattern: 'he-said-that-:language-is-:description',
    result: null
  },
  {
    should: 'return null if there is match but not at the start',
    str: 'she-said-that-elm-is-awesome',
    pattern: 'he-said-that-:language-is-:description',
    result: null
  },
  {
    should: 'return {} if there is match but the pattern has no parameters',
    str: 'react-is-awesome',
    pattern: 'react-is-awesome',
    result: {}
  },
  {
    should: 'extract single parameter',
    str: 'my-name-is-Misha',
    pattern: 'my-name-is-:name',
    result: {
      name: 'Misha'
    }
  },
  {
    should: 'extract multiple parameters',
    str: '/users/123/friends/456/photo',
    pattern: '/users/:userId/friends/:friendId/photo',
    result: {
      userId: '123',
      friendId: '456'
    }
  },
  {
    should: 'handle special characters in the pattern',
    str: 'my(name}-is+Misha-{${Moroshko[[',
    pattern: 'my(name}-is+:firstName-{${:lastName[[',
    result: {
      firstName: 'Misha',
      lastName: 'Moroshko'
    }
  }
];

describe('extractParams should', function() {
  testCases.forEach(function(testCase) {
    it(testCase.should, function() {
      expect(extractParams(testCase.str, testCase.pattern)).to.deep.equal(testCase.result);
    });
  });
});
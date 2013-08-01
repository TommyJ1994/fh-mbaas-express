// Copyright (c) FeedHenry 2011
var request = require('request');

module.exports = {
  'test / endpoint' : function(test, assert) {

    request(process.env.FH_TEST_HOSTNAME + '/', function(err, response, body){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(response.statusCode = 404);
      assert.ok(body === "Cannot GET /");
      test.finish();
    });
  },
  'test /cloud endpoint' : function(test, assert) {

    request.get(process.env.FH_TEST_HOSTNAME + '/cloud',
      {
        json : {} // force request to parse incoming json
      },
      function(err, response, data){
        assert.ok(!err);
        assert.ok(response);
        assert.ok(data.error === "Error: no function specified, or unsupported HTTP method used");
        test.finish();
    });
  },
  'test /cloud/doesnotexist endpoint' : function(test, assert) {
    request.get(process.env.FH_TEST_HOSTNAME + '/cloud/doesnotexist',
    {
      json : {} // force request to parse incoming json
    },
    function(err, response, data){
      assert.ok(!err);
      assert.ok(response);
      assert.ok(data.error === "Error: no such function: doesnotexist");
      test.finish();
    });
  }
};
Tinytest.add 'bluffmaster - should exist', ->
  expect(bluffmaster).to.be.an('object')
  expect(bluffmaster.name).to.be.an('object')
  expect(bluffmaster.name.firstName).to.be.a('function')
  expect(bluffmaster.name.firstName()).to.be.a('string').that.is.ok

Tinytest.add 'blaver - should exist', ->
  expect(blaver).to.be.an('object')
  expect(blaver.name).to.be.an('object')
  expect(blaver.name.firstName).to.be.a('function')
  expect(blaver.name.firstName()).to.be.a('string').that.is.ok

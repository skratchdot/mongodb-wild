(function () {
	var t = db.jstests_all;
	t.drop();

	// Populate some "user" documents
	t.save( { 'name' : { 'first' : 'Jim', 'last' : 'Smith' }, 'description' : 'This is an example.' } );
	t.save( { 'name' : { 'first' : 'Bob', 'last' : 'Smith' }, 'description' : 'This is an example.' } );
	t.save( { 'name' : { 'first' : 'Amy', 'last' : 'Smith' }, 'description' : 'My name is not "Bob".' } );
	t.save( { 'name' : { 'first' : 'Jim', 'last' : 'Smart' }, 'Bob' : 'This is an example.' } );
	t.save( { 'name' : { 'first' : 'Bob', 'last' : 'Smart' }, 'description' : 'This is an example.' } );
	t.save( { 'name' : { 'first' : 'Amy', 'last' : 'Smart' }, 'description' : 'This is an example.' } );

	// Search entire users collection for Bob
	assert.eq( 4, t.wild('Bob').length );
	assert.eq( 4, t.wild(/Bob/gi).length );
	assert.eq( 4, t.find().wild('Bob').length );

	// Search for exact values of 'Bob'
	assert.eq( 2, t.wild(': "Bob"').length );

	// Search for exact keys called 'Bob'
	assert.eq( 1, t.wild('"Bob" :').length );

	// Search for documents containing 'Bob', filtering by last name of 'Smith'
	assert.eq( 2, t.wild('Bob', {'name.last' : 'Smith'}).length );
	assert.eq( 2, t.find({'name.last' : 'Smith'}).wild('Bob').length );

	t.drop();
}());
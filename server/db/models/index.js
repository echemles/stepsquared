// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./tutorial');
require('./user');
require('./help');
require('./media');
require('./category');
require('./step');

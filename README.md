# scoped-mousetrap

add support for switching scopes to Mousetrap https://github.com/ccampbell/mousetrap

## Getting Started

Include the original Mousetrap library plus `scoped-mousetrap.js` in your web
project.

## Documentation

`window.ScopedMousetrap` will be installed as a singleton. You may also use it
via AMD with something like Require.JS.

Note: this does not (yet) support more complex features of Mousetrap like key
sequences. Only simple key and key-combinations are supported.

### JavaScript API

#### .on(keys, scope, handler)

- **keys**, String[] or String: key(s) to bind
- **scope**, String: name of the scope to incorporate this bind (optional, default="*")
- **handler**, Function: event handler to be executed when the key is pressed

Records a binding against a specific scope. Neither the binding nor the scope are
automatically enabled.

#### .scopes(scopes)

- **scopes**, String[] or String: scope(s) to activate

Returns the previously active set of scopes. Replaces the previously active set
of scopes with the provided set of scopes. Bindings within the provided scopes
are activated, all other bindings are deactivated.

#### .binds()

Returns an Object data structure of all binds, grouped by scope.

#### .activeBinds()

Returns a String[] of currently bound keys.

#### .reset()

Forgets all binds and scopes and wipes Mousetrap clean.


### Example

```javascript
ScopedMousetrap.on('esc', 'normal', function () { /* ... */ });
ScopedMousetrap.on('esc', 'specific', function () { /* ... */ });

ScopedMousetrap.scopes('normal'); // returns []
// now the first handler is bound to the "escape" key

ScopedMousetrap.scopes('specific'); // returns ['normal']
// now the second handler is bound to the "escape" key
```

## Contributing

Formal style-guide for this project is JSLint. See JSLint settings at the top of
each file.

Add unit tests for any new or changed functionality. Lint and test your code
using [Grunt](http://gruntjs.com/).

    grunt test

This project uses [Git Flow](https://github.com/nvie/gitflow), so the master
branch always reflects what is in production (i.e. what is in the NPM repository).
New code should be merged into the develop branch.

## Release History

See [GitHub Releases](https://github.com/jokeyrhyme/json-fs/releases)

## License

Copyright (c) 2013 Ron Waldon
Licensed under the MIT license.

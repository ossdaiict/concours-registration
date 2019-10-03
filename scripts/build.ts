import shell from 'shelljs'

// Build the react client
shell.exec('yarn client:build')

// Delete any existing build of react client from the server's public folder
shell.rm('-rf', 'public/')

// Make the public folder for the server
shell.mkdir('public')

// Copy the new build of the react client
shell.cp('-R', 'client/build/*', 'public/')

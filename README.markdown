# What is it?:

MemPool is a module created to simplify the debugging of application performance in Appcelerator's Titanium 

# Usage:

This module is pretty simple to use, you just need to create the MemoryPool object like so

	var memoryPool = new MemoryPool();

And that is it, now you can use the following functions to help develop or improve the performance of your applications

	showMemoryUsage(); // shows a message on the top of the screen with the current memory usage
	hideMemoryUsage(); // hides the message that displays the current memory usage
	clean(object); // pass in the object (or array of objects) that you want to clear from memory

# About:

Created by Raul Riera, http://raulriera.com

The code is a modified version of

https://github.com/pec1985/Single-Context
http://developer.appcelerator.com/question/116867/this-is-a-solution-to-your-memory-woes
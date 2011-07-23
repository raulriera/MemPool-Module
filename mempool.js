/* 

MemPool Module for Appcelerator Titanium

About:
Created by Raul Riera, http://raulriera.com

Code taken from https://github.com/pec1985/Single-Context and modified

*/

(function(){
	
	MemoryPool = function() {
	    var _window;
	    /*
	     Here we make our "auto-release" pool. It's simply a window.
	     We hide it upon creation so it won't interfere with our view hierarchy.
	 
	     5/3/2011: It seems that the window does not need to be a subcontext, just a regular window will do.
	     */
	    this.init = function() {
	        _window = Ti.UI.createWindow();
	        _window.hide();
	        _window.open();
	    }
	    // This is where we clear out the memPool by closing it then reopening it again.
	    this.clean = function(obj) {
	        if(obj instanceof Array) {
	            var arLen=obj.length;
	            for ( var i=0, len=arLen; i<len; ++i ) {
	                // We then stick the entire view into the pool
	                _window.add(obj[i]);
	            }
	        } else {
	            // We then stick the entire view into the pool
	            _window.add(obj);
	        }
	        Ti.API.info('Cleaning MemoryPool.');
	 
	        // We empty the pool by closing it.
	        _window.close();
	 
	        // We recreate the window again for the next object
	        this.init();
	    };
	    
	    // This displays a message with the current memory usage
	    this.showMemoryUsage = function(){
		
			var screenWidth = Ti.Platform.displayCaps.platformWidth;
		
			var messageWin = Ti.UI.createWindow({
				height: 30,
				width: screenWidth,
				top: 0,
				touchEnabled: false
			});
			var messageView = Ti.UI.createView({
				id:'messageview',
				height: 30,
				width: screenWidth,
				backgroundColor: '#fff',
				opacity: 0.7,
				touchEnabled: false
			});
	
			var messageLabel = Ti.UI.createLabel({
				id: 'messagelabel',
				text: '',
				color: '#000',
				width: screenWidth,
				height: 'auto',
				font:{
					fontFamily: 'Helvetica Neue',
					fontSize: 13
				},
				textAlign: 'center'
			});
		
			// Converts the memory from bytes to kilobytes or megabytes
			var parseMemory = function(mem){
				
				// bytes to kilobytes
				var kb = mem / 1024;
				// bytes to megabytes
				var mb = kb / 1024;
				
				if (mb > 1) {
					mem = mb.toFixed(2) + " mb";
				} else if (kb > 1) {
					mem = kb.toFixed(2) + " kb";
				} else {
					mem = mem.toFixed(2) + " bytes";
				}
				return mem;
			};
		
			messageWin.add(messageView);
			messageWin.add(messageLabel);
		
			// this app event will show the message
			Ti.App.addEventListener('showMemoryDisplay', function(){
				setInterval(function(){
					var memory = Ti.Platform.availableMemory;
					
					// Parse this number into something usable and display it back
					messageLabel.text = parseMemory(memory);
				}, 2000);
				messageWin.open();	
			});
			// this app event will hide the message
			Ti.App.addEventListener('hideMemoryDisplay', function(){
				messageWin.close();
			});
			
			Ti.App.fireEvent('showMemoryDisplay');
		};
	
		// this hides the message with the memory usage
		this.hideMemoryUsage = function(){
			Ti.App.fireEvent('hideMemoryDisplay');
		};
	    
	    this.init();
	}
})();
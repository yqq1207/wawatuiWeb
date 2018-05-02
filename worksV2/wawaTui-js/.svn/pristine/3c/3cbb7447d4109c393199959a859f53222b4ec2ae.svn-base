	pushHistory(); 
	window.addEventListener("popstate", function(e) { 
		window.location.href=document.referrer;
	}, false); 
   function pushHistory() { 
     var state = { 
//	    title: "title",
       url: '#'
     }; 
     window.history.pushState(state, '#'); 
   }
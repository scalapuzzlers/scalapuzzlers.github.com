$(function(){
	'use strict';
	var gaq;

	// Solution
	function showSolution() {
		var loc, id;
		setTimeout(kataify,0); // defer

		loc = location.href.substring(location.href.lastIndexOf("/")+1) // loc: XYZ-hey.html#solution;
		id = "pzzlr-" + loc.substring(0,loc.indexOf("-")); // XYZ

		(function () {
			var dsq;
			window.disqus_developer = 1;
			window.disqus_shortname = 'scalapuzzlers';
			window.disqus_identifier = id;
			window.disqus_url = 'http://scalapuzzlers.com/!#/' + id;
			dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		}());
	}
	$("[href='#solution']").click(showSolution);
	if( void 0 !== document.location.hash ) { showSolution(); }	

	// Analytic
	gaq = gaq || [];
	gaq.push(['_setAccount', 'UA-31486114-1']);
	gaq.push(['_trackPageview']);
	(function () {
		var ga, s;
		ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}());
});
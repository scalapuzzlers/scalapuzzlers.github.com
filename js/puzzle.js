/*global $, document, window, prettyPrint, DISQUS */

$(document).ready(function () {
	'use strict';
	var disqus_shortname, disqus_identifier, disqus_url, pathToID, id, activeElem, elem, gaq;
	
	String.prototype.endsWith = function (suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
	
	pathToID = {
		"/": '#navbar-home',
		"index.html": '#navbar-home',
		"archive.html": '#navbar-archive',
		"contribute.html": '#navbar-contribute',
		"contact.html": '#navbar-contact',
		"about.html": '#navbar-about'
	};

	function mapPathToID(path) {
		var key, id = null;
		$.each(function (key) {
			if (path === key) {
				id = pathToID[key];
			}
		});
		return id;
	}

	id = mapPathToID(window.location.pathname);
	if (id !== null) {
		$(id).addClass("active");
	}

	(function () {
		var dsq;
		disqus_shortname = 'scalapuzzlers';
		disqus_identifier = 'elem.id';
		disqus_url = 'http://scalapuzzlers.com/!#/' + 'elem.id';

		dsq = document.createElement('script');
		dsq.type = 'text/javascript';
		dsq.async = true;
		dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}());
				 
	activeElem = null;
	
	$('a[id|="pzzlr"]').each(function (index, elem) {
		$(elem).click(function () {
			$('#disqus_thread').hide();
			$('#prime-space').html("");
			$('#prime-space').load('puzzlers/' + elem.id + '.html', function () {
				prettyPrint();
				document.location.hash = elem.id;
				window.scrollTo(0, 0);
				$('#show-and-tell').click(function () {
					$('#show-and-tell').addClass("disabled");
					$('#correct-answer').addClass("correct-answer");
					$('#explanation').show('slow', function () {
						DISQUS.reset({
							reload: true,
							config: function () {
								this.page.identifier = elem.id;
								this.page.url = 'http://scalapuzzlers.com/#!/' + elem.id;
								this.page.title = $('#title').find("h1").text();
							}
						});
						$('#disqus_thread').show();
						$('html,body').animate({scrollTop: $('#correct-answer').offset().top - $('.navbar').height() - 2}, 900);
					});
				});
			});
			if (activeElem !== null) {
				$(activeElem).removeClass("active");
			}
			activeElem = $(elem).parent();
			$(activeElem).addClass("active");
		});
	});
		
	
	$('#disqus_thread').hide();
	if (document.location.hash) {
		elem = $(document.location.hash)[0];
		$('#prime-space').load('puzzlers/' + elem.id + '.html', function () {
			prettyPrint();
			window.scrollTo(0, 0);
			$('#show-and-tell').click(function () {
				$('#show-and-tell').addClass("disabled");
				$('#correct-answer').addClass("correct-answer");
				$('#explanation').show('slow', function () {
					disqus_identifier = elem.id;
					disqus_url = 'http://scalapuzzlers.com/#!/' + elem.id;
					DISQUS.reset({
						reload: true,
						config: function () {
							this.page.identifier = elem.id;
							this.page.url = 'http://scalapuzzlers.com/#!/' + elem.id;
						}
					});
					$('#disqus_thread').show();
					$('html,body').animate({scrollTop: $('#correct-answer').offset().top - $('.navbar').height() - 2}, 900);
				});
			});
		});
		
		if (activeElem !== null) {
			$(activeElem).removeClass("active");
		}
		activeElem = $(elem).parent();
		$(activeElem).addClass("active");
	} else {
		$('#welcome-content').show();
		$('#disqus_thread').hide();
	}
	
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
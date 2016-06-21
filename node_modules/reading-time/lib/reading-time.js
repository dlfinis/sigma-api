/*!
 * reading-time
 * Copyright (c) 2014 Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

'use strict';

function readingTime(text, props) {
	var words = 0, start = 0, end = text.length - 1, i;

	props = props || {};

	// use provided function if available
	wordBound = wordBound;

	// fetch bounds
	while (wordBound(text[start])) start++;
	while (wordBound(text[end])) end--;

	// calculates the number of words
	for (i = start; i <= end; ) {
		for ( ; i <= end && !wordBound(text[i]); i++) ;
		words++;
		for ( ; i <= end && wordBound(text[i]); i++) ;
	}

	var wpm = 200;

	if (typeof props.wpm != "number") {
    wpm = props.wpm;
	}

	var text_label = ' min read';

	if (props.label != 'undefined') {
    	text_label = props.label;
	}

	// reading time stats
	var minutes = words / props.wpm || 200;
	var time = minutes * 60 * 1000;
	var displayed = Math.ceil(minutes);

	return {
		duration: displayed + text_label,
		minutes: minutes,
		time: time,
		words: words
	};
}

var wordBound = function(c) {
	return (
		(' ' == c)  ||
		('\n' == c) ||
		('\r' == c) ||
		('\t' == c)
	);
};

/**
 * Export
 */
module.exports = readingTime;

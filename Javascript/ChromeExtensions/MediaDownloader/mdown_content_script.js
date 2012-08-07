/**
 * Media file grabber
 *
 * @author Sebastian Kim
 */

/* The background page is asking us to find an address on the page. */
if (window == top) {
	chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
		sendResponse(findMediaFiles());
	});
}

/**
 * Search the tag for a media file.
 * Return an empty array if nothing found.
 */
var findMediaFiles = function() {
	var files = Array();

	/* <embed> */
	var embeds = document.getElementsByTagName('embed');
	for(var i=0; i<embeds.length; i++) {
		/* attributes */
		var embed_filename = embeds[i].getAttribute('filename');
		var embed_src = embeds[i].getAttribute('src');
		
		if(embed_filename && filterFile(embed_filename)) {
			files.push(embed_filename);
		}
		if(embed_src && filterFile(embed_src)) {
			files.push(embed_src);
		}
		
		/* Vimeo Supports */
		if(embed_src && embed_src.indexOf('vimeo') != -1) {
			var clip_id = embed_src.match(/clip_id=(\d+)\&/);
			if(clip_id)
				files.push(vimeo_getURLFromId(clip_id[1]));
		}
	}
	
	/* <video>-><source> */
	var sources = document.getElementsByTagName('source'); 
	for(var i=0; i<sources.length; i++) {
		/* attributes */
		var source_src = sources[i].getAttribute('src');
		if(source_src && filterFile(source_src)) {
			files.push(source_src);
		}
	}
	
	/* <iframe> and <object> */
	var iframes = document.getElementsByTagName('iframe');
	var objects = document.getElementsByTagName('object');
	
	/* Vimeo Supports */
	if(iframes || objects) {
		var vimeo_src = vimeo_getSource(iframes, objects);
		for (var i=0; i<vimeo_src.length; i++) {
			files.push(vimeo_src[i]);
		}
	}
	
	//console.log(files);
	return files;
};

/* Filter flash files */
var filterFile = function(url) {
	if(url.indexOf('.swf') == -1)
		return true;
		
	return false;
};

/* Vimeo Support */
var vimeo_getSource = function(iframes, objects) {
	var ids = Array();
	var sources = Array();

	/* iframes */
	for(var i=0; i<iframes.length; i++) {
		var iframe_src = iframes[i].getAttribute('src');
		if(iframe_src && iframe_src.indexOf('vimeo') != -1) {
			var clip_id = iframe_src.match(/video\/(\d+)/);
			if(!clip_id)
				clip_id = iframe_src.match(/clipid=(\d+);/);
			
			if(clip_id && !in_array(clip_id[1], ids))
				ids.push(clip_id[1]);
		}
	}
	
	/* objects */
	for(var i=0; i<objects.length; i++) {
		var objects_id = objects[i].getAttribute('id');
		if(objects_id) {
			var clip_id = objects_id.match(/player(\d+)_/);
			
			if(clip_id && !in_array(clip_id[1], ids))
				ids.push(clip_id[1]);
		}
	}
	
	//console.log(ids);
	for(var i=0; i<ids.length; i++) {
		var url = vimeo_getURLFromId(ids[i]);
		
		if(url)
			sources.push(url);
	}
	return sources;
};

var vimeo_getURLFromId = function(id) {
	var doc = getXML("http://vimeo.com/moogaloop/load/clip:" + id);
	
	if(doc) {
		var sig = doc.split(/<\/?request_signature>/)[1];
		var exp = doc.split(/<\/?request_signature_expires>/)[1];
		
		if(sig && exp)
			return ("http://www.vimeo.com/moogaloop/play/clip:" + id + "/" + sig + "/" + exp + "/?q=sd");
	}
	
	return null;
};

var getXML = function (url) {
	var ajaxResponse = new XMLHttpRequest();
	 
	if(!ajaxResponse) 
		return false;

	ajaxResponse.open('GET', url, false); 
	ajaxResponse.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	ajaxResponse.send(null); 
	if(ajaxResponse.status == 200) 
		return ajaxResponse.responseText; 

	return false;
}

var in_array = function (needle, haystack) {
	for (key in haystack) {
		if (haystack[key] == needle)
			return true;
	}

	return false;
}
/* --------------------------------------------------------------------------
	last update: 09/06/16
																	created by edo.
	
	This script attach the rollover effect to image on 'rollover' class.
	This is distributed by the MIT license.
	
	URL: http://css-eblog.com/
----------------------------------------------------------------------------- */

(function() {
var filename = 'rollover.js';
var _className = 'rollover';

function getJsParam() {
	//get scripts list.
	var scripts = document.getElementsByTagName( 'script' );
	var script;
	var params = {};
	
	//pickup this file.
	for ( var i=0; i<scripts.length; i++ ) {
		var s = scripts.item( i );
		if( s.src.indexOf( filename ) !== -1 ) {
			script = s;
			break;
		}
	}
	
	if( script ) {
		script.src.match( /(.*)(\?)(.*)/ );
		if( RegExp.$3 ) {
			var a = RegExp.$3.split( '&' );
			if( a ) {
				for( var k=0; k<a.length; k++ ) {
					var p = a[ k ].split( '=' );
					if( p[0] ) {
						params[ p[0] ] = p[1];
					}
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
	
	return params;
}

function addEvent( node, evt, handler ) {
	try {
		if( node.addEventListener ) {
			node.addEventListener( evt, handler, false );
		} else {
			node.attachEvent( 'on' + evt, handler );
		}
	} catch( e ) {}
}

function setEvent( ele, ty ) {
	ele.originalSrc = ele.src;
	ele.originalSrc.match( /^(.*)(\.{1}.*)/g );
	ele.hoverSrc = RegExp.$1 + ty + RegExp.$2;
	addEvent( ele, 'mouseover', function( evt ) {
		var tar = evt.target || evt.srcElement;
		tar.src = tar.hoverSrc;
	});
	addEvent( ele, 'mouseout', function( evt ) {
		var tar = evt.target || evt.srcElement;
		tar.src = tar.originalSrc;
	});
}

function startRollover() {
	var jParam = getJsParam();
	var jType = jParam.type ? jParam.type : '_on';
	var imgs = document.getElementsByTagName( 'img' );
	for( var i=0; i<imgs.length; i++ ) {
		if( imgs[i].className.indexOf( _className ) !== -1 ) {
			setEvent( imgs[i], jType );
		}
	}
}

addEvent( window, 'load', startRollover );
})();
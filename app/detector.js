var webgl = (function () {
	try { 
		return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' );
	}
	catch( e ) {
		return false;
	}
})();
if(!webgl) alert("Strona nie może zostać wyświetlona, gdyż twoja przeglądarka nie obsługuje technologii WebGL");
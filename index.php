<?php 
/*
 * A Design by W3layouts
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
 *
 */
include "app/detect.php";
if ($browser_t == 'web') {
	header( 'Location: web/index.html');
}else{
	header( 'Location: smartphone/index.html');
}
?>

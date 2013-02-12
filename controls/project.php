<?php class project extends sn {

function __construct() {

}

function engine() {
	
	
	load("index.tpl");
	innerHTML("#navbar",fetch("navbar.tpl"));
	innerHTML("#hero",fetch("hero.tpl"));
	innerHTML("#content",fetch("main.tpl"));
	
	echo html();
	
}

} ?>

<?php class project extends sn {

function __construct() {

}

function engine() {
	
	
	load("index.tpl");
	assign("page",url::$page);
	innerHTML("#navbar",fetch("navbar.tpl"));

	switch (url::$page) {
	case "main":
		innerHTML("#hero",fetch("hero.tpl"));
		innerHTML("#content",fetch("main.tpl"));
	break;
	case "automation":
		innerHTML("#content",fetch("automation.tpl"));
	break;
	}
	
	echo html();
	
}

} ?>

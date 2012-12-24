<?php class project extends sn {

function __construct() {

}

function engine() {
	
	
	load("index.tpl");
	innerHTML("#navbar",fetch("navbar.tpl"));
	innerHTML("#hero",fetch("hero.tpl"));
	innerHTML("#content",fetch("content.tpl"));
	
	echo html();
	
	/*zip("test.zip");
	addToZip("sn-system/conf","");
	addToZip("sn-system/core/","sn-system");
	addToZip("sn-system/external/./");*/
	
	/*if (query("SELECT * FROM SMS_INC",$ms)) {
		foreach ($ms as $r) {
			echo $r->caption;
		}
		echo "go!";
	} else {
		echo "bad";
	}
	*/
	
	/*assign('test','это тестовая страница');
	$test=fetch("test.tpl");
	assign('title','standart-n');
	load(fetch("index.tpl"));
	innerHTML("#main",$test);
	echo html();*/
}

} ?>

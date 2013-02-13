<?php class url extends sn {
	
public static $action;
public static $query;
public static $page;
public static $subpage;
public static $catalog;
public static $callback;


function __construct() { $i=0;
	self::$page="main";

	if (isset($_REQUEST["action"])) {
		self::$action=trim(strval($_REQUEST["action"]));
	}
	if (isset($_REQUEST["callback"])) {
		self::$callback=trim(strval($_REQUEST["callback"]));
	}		

	self::$query=$_SERVER["QUERY_STRING"];
	foreach (explode("/",self::$query) as $key) { $i++;
		if ($key!="") {
			if ($i==1) {
				self::$page=trim(strval($key));
			}
			if ($i==2) {
				self::$subpage=trim(strval($key));
			}
		}
	}

}


} ?>

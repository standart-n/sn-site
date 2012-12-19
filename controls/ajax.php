<?php class ajax extends sn {
	
public static $response;

function __construct() {
	self::$response=array();
}

function getResponse() {
	if (self::getAction()) {
		return self::getResponseString(json_encode(self::$response));
	}		
}

function getResponseString($s=null) {
	if ($s) {
		console::write("---");
		console::write("response:");
		console::write($s);
		if (url::$callback) {
			return url::$callback."(".$s.");";
		} else {
			return $s;
		}
	}
}

function getAction() {
	if (url::$action) {
		console::write("action: ".url::$action);
		switch(url::$action) {
			case "show":
				self::$response=project::engine();
				return true;
			break;
		}
	}
	return false;
}

} ?>

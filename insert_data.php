<?php
  require_once('config1.php');

  $con = mysql_connect($dh_name, $db_user, $db_pass) or die('Could not connect to database server.');
  mysql_select_db($db_name, $con) or die('Could not select database.');

echo "brams db selected";


  if (($_GET[T]<>"") && ($_GET[P]<>"") && ($_GET[E]<>"")) {

	  $sql="INSERT INTO flashcards (Thai, Pronounce, English) VALUES ('$_GET[T]','$_GET[P]','$_GET[E]')";

	  if (!mysql_query($sql)) {
		 die('Error: ' . mysql_error());
	  }

	  echo "OK";

   }

   mysql_close($con);
?>

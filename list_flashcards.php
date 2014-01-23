<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<head>
  <script type="text/javascript" src="inc/jquery-latest.js"></script>
  <script type="text/javascript" src="inc/jquery.tablesorter.js"></script>

<script type="text/javascript" />

$(document).ready(function() {
	$("#myTable").tablesorter();
    }
);

</script>
</head>

<body>
<?php
require_once('config1.php');

  $con = mysql_connect($dh_name, $db_user, $db_pass) or die('Could not connect to database server.');
  mysql_select_db($db_name, $con) or die('Could not select database.');

  $sql="select * from flashcards";
  $result=mysql_query($sql);
  if (!$result) {
	 die('Error: ' . mysql_error());
  }

?>
<span id="GRA"></span>
<style>

.english li {
    list-style-type:circle;
    list-style-position:inside;
    padding-left:5px;
}
table.tablesorter {
	font-family:arial;
	background-color: #CDCDCD;
	margin:10px 0pt 15px;
	font-size: 8pt;
	width: 100%;
	text-align: left;
}
table.tablesorter thead tr th, table.tablesorter tfoot tr th {
	background-color: #e6EEEE;
	border: 1px solid #FFF;
	font-size: 8pt;
	padding: 4px;
}
table.tablesorter thead tr .header {
	background-image: url(inc/blue/bg.gif);
	background-repeat: no-repeat;
	background-position: center right;
	cursor: pointer;
}
table.tablesorter tbody td {
	color: #3D3D3D;
	padding: 4px;
	background-color: #FFF;
	vertical-align: top;
}
table.tablesorter tbody tr.odd td {
	background-color:#F0F0F6;
}
table.tablesorter thead tr .headerSortUp {
	background-image: url(inc/blue/asc.gif);
}
table.tablesorter thead tr .headerSortDown {
	background-image: url(inc/blue/desc.gif);
}
table.tablesorter thead tr .headerSortDown, table.tablesorter thead tr .headerSortUp {
background-color: #8dbdd8;
}

table.tablesorter tbody td.thai {
	font-family:arial;
    font-size:24px;
    width:150px;
 }

table.tablesorter tbody td.pronounce {
   font-family:arial;
   font-size:14px;
   width:150px;
}

table.tablesorter tbody td.english {
}

</style>


<h1>Database dump</h1>
<table id="myTable" class="tablesorter" cellspacing="1">
<?php
     echo '<thead><tr><th>Thai</th><th>Pronounciation</th><th>English</th><th>Know</th><th>Right</th><th>Wrong</th></tr></thead><tbody>';
     while($row = mysql_fetch_array($result)) {
         echo '<tr>';
         echo '<td class="thai">'.$row['Thai'].'</td><td class="pronounce">'.$row['Pronounce'].'</td><td class="english">'.$row['English'].'</td>'.'</td><td class="english">'.$row['known'].'</td>'.'</td><td class="english">'.$row['right'].'</td>'.'</td><td class="english">'.$row['wrong'].'</td>';
         echo '</tr>';
     }
     mysql_close($con);
?>
</tbody></table>
</body>
</html>
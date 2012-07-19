<?php
/**
 * MergeJoin algorithm implemented in PHP
 * @author: Sebastian Kim
 */
$row1 = fgetcsv($file1 = fopen('students.csv', r));
$row2 = fgetcsv($file2 = fopen('enrolment.csv', r));

while($row1 && $row2) {
	if($row1[0] < $row2[0])
		$row1 = fgetcsv($file1);
	else {
		if($row1[0] == $row2[0])
			echo "$row1[0], $row1[1], $row1[2], $row2[1], $row2[2]\n";
		$row2 = fgetcsv($file2);
	}	
}
?>

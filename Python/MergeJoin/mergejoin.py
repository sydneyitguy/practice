# MergeJoin algorithm implemented in Python 
# @author: Sebastian Kim

import csv
import sys

it1 = csv.reader(open('students.csv'))
it2 = csv.reader(open('enrolment.csv'))

row1 = it1.next()
row2 = it2.next()

while(row1 and row2):
	if(row1[0] < row2[0]):
		row1 = it1.next()
	else:
		if(row1[0] == row2[0]):
			print '{}, {}, {}, {}, {}'.format(row1[0],row1[1],row1[2],row2[1],row2[2])
		try:
			row2 = it2.next()
		except StopIteration:
			sys.exit(1);		

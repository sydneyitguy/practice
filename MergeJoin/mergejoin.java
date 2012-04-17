/**
 * MergeJoin algorithm implemented in Java 
 * @author: Sebastian Kim
 */

import java.io.*;
import java.util.*;

/**
 * Test
 */
class Test {
	public static void main(String[] args) throws FileNotFoundException {
		FileScanner f1 = new FileScanner("students.csv");
		FileScanner f2 = new FileScanner("enrolment.csv");	
		Merge result = new Merge(f1, f2);
		
		while(result.hasNext()) 
			System.out.println(Arrays.toString(result.next()));
	}
}

/**
 * Merge Join
 */
class Merge implements Iterator<String[]> {
	private Iterator<String[]> it1, it2;
	private String[] line1, line2;
	
	public Merge(Iterator<String[]> firstSortedStream, Iterator<String[]> secondSortedStream ) {
		it1 = firstSortedStream;
		it2 = secondSortedStream;
		line1 = it1.next();
		line2 = it2.next();
	}

	public String[] next() {
		int primaryKey1 = Integer.parseInt(line1[0]), primaryKey2 = Integer.parseInt(line2[0]);
		
		if(primaryKey1 < primaryKey2) {
			if(it1.hasNext())
				line1 = it1.next();
			else
				line1 = null;
		} else {
			if(primaryKey1 == primaryKey2) {
				String[] valueToReturn = new String[] {line1[0], line1[1], line1[2], line2[1], line2[2]};
				if(it2.hasNext())
					line2 = it2.next();
				else
					line2 = null;
				return valueToReturn;
			}
			line2 = it2.next();
		}
		
		return this.next();
	}

	public boolean hasNext() {
		if(line1 != null && line2 != null)
			return true;
		return false;
	}

	@Override
	public void remove() {
		throw new UnsupportedOperationException("Not supported.");
	}
}


/**
 * CSV file iterator.
 */
class FileScanner implements Iterator<String[]> {
     
    static final String FIELD_SEPARATOR = ",";
    BufferedReader input = null;
    
    // The current line. Cleared to null when next() is called.
    String line = null;

	public FileScanner(String filename) throws FileNotFoundException {
        FileReader file = new FileReader(filename);
        //use buffering, reading one line at a time
        input = new BufferedReader(file);
    }
	
    @Override
    public String[] next() {
        if (line==null) {
            if(input==null) {
                throw new NoSuchElementException();
            } else {
                updateLine();
            }
        }  
        String[] values = line.split(FIELD_SEPARATOR);
        line = null;
        return values;
    }
	
    @Override
    public boolean hasNext() {
        if (line != null) {
            return true; // Still have a string to return
        } else { // -> line==null
            if (input == null) {
                return false; // No more data to put into line
            } else {
                updateLine();
                return line != null;
            }
        }
    }

       
    @Override
    protected void finalize() throws Throwable {
        try {
            if (input != null) {
                input.close();  // close opened file
                input = null;
            }
        } finally {
            super.finalize();
        }
    }

    @Override
    public void remove() {
        throw new UnsupportedOperationException("Not supported.");
    }
    
    private void updateLine() {
        try {
            line = input.readLine();
        } catch (IOException ex) {
            System.err.println("Problem reading line");
        }
    }
}


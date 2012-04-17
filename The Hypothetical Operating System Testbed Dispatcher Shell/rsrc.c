/**
 * I/O Resources 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */
#include "rsrc.h"

/* Allocate i/o resources to the process */
void rsrcAlloc(PcbPtr ps) {
	io.printer -= ps->io.printer;
	io.scanner -= ps->io.scanner;
	io.modem -= ps->io.modem;
	io.cd -= ps->io.cd;
}

/* Check whether there is enough i/o resource */
int rsrcChk(PcbPtr ps) {
	if(io.printer < ps->io.printer || io.scanner < ps->io.scanner ||
	   io.modem < ps->io.modem || io.cd < ps->io.cd)
		return 0;	// false: not available
	return 1;		// true: available
}

/* Free i/o resource from the process */
void rsrcFree(PcbPtr ps) {
	io.printer += ps->io.printer;
	io.scanner += ps->io.scanner;
	io.modem += ps->io.modem;
	io.cd += ps->io.cd;
}

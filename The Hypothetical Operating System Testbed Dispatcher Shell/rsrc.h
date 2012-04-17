/**
 * I/O Resources 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#ifndef RSRC_H
#define RSRC_H

#define MAX_PRINTER 2
#define MAX_SCANNER 1
#define MAX_MODEM 1
#define MAX_CD 2

/* I/O resources structure */
typedef struct rsrc {
	int printer;
	int scanner;
	int modem;
	int cd;
} Rsrc;

#include "pcb.h"

/* global variable: currently available io resources */
Rsrc io;

/* Allocate i/o resources to the process */
void rsrcAlloc(PcbPtr ps);

/* Check whether there is enough i/o resource */
int rsrcChk(PcbPtr ps);

/* Free i/o resource from the process */
void rsrcFree(PcbPtr ps);

#endif

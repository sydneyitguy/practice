/**
 * Hypothetical Operating System Testbed (HOST) Dispatcher Shell 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#ifndef HOST_H
#define HOST_H

#define MAX_BUFFER 128
#define DELIMITER ", "
#define TIME_QUANTUM 1
#define MAX_MEMORY 1024
#define MAX_MEMORY_REALTIME 64
#define ERROR_MEM 1
#define ERROR_IO 2

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <time.h>
#include "mab.c"
#include "rsrc.c"
#include "pcb.c"

int cpuTimer;
PcbPtr inputQ, userJobQ;
PcbPtr realTimeQ, priorityQ_1, priorityQ_2, priorityQ_3;
MabPtr memory, realTimeMemory;

/* Print error and exit */
void error(char msg[MAX_BUFFER]);

/* Read job dispatch list from the file */
void readFile(char *fileName);

/* Check whther the Pcb requires excessive resources */
int validateJob(PcbPtr ps);

/* Dequeue input queue, put into realtime / userjob queue */
void deqInputQ();

/* Dequeue userjob queue, put into priority queues */
void deqUserJobQ();

/* Initialise state */
void initialise();

/* Main function */
int main(int argc, char **argv);

#endif

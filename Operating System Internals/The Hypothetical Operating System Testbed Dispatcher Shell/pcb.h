/**
 * Process Control Block (PCB)
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#ifndef PCB_H
#define PCB_H

#define MAX_ARGS 2

typedef enum PCB_STATUS { 
	PCB_INITIALISED, 
	PCB_SUSPENDED, 
	PCB_RUNNING, 
	PCB_TERMINATED,
} pcb_status;

typedef struct pcb {
	pid_t pid;		 	// system process ID
	char * args[MAX_ARGS];		// program name and args
	int arrivalTime;
	int priority;
	int remainingCpuTime;
	int memNeed;

	struct rsrc io;			// i/o resources
	struct mab * mab;		// memory allocation block
	struct pcb * next;		// links for next Pcb
	pcb_status status;		// status of process
} Pcb;

typedef Pcb * PcbPtr;

/* Print information of Pcb */
void printPcbInput(PcbPtr ps);
void printPcb(PcbPtr ps);

/* Start a process */
PcbPtr startPcb(PcbPtr ps);

/* Suspend a process */
PcbPtr suspendPcb(PcbPtr ps);

/* Terminate a process */
PcbPtr terminatePcb(PcbPtr ps);

/* Create an inactive Pcb */
PcbPtr createnullPcb();

/* Enqueue process */
PcbPtr enqPcb (PcbPtr head, PcbPtr ps);
	  
/* Dequeue process */
PcbPtr deqPcb (PcbPtr *head);

#endif

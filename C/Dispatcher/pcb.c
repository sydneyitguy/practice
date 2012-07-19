/**
 * Process Control Block (PCB)
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#include "pcb.h"

/**
 * Print information of Pcb 
 */
void printPcbInput(PcbPtr ps) {
	printf("%d_%d_%d_%d_%d_%d_%d_%d => ", ps->arrivalTime, ps->priority, ps->remainingCpuTime,
		ps->memNeed, ps->io.printer, ps->io.scanner, ps->io.modem, ps->io.cd);
}

void printPcb(PcbPtr ps) {
	printPcbInput(ps);
	printf("pid: %d / mem_offset: %d\n", ps->pid, ps->mab->offset);
}

/**
 * Start a process 
 * @return: PcbPtr of process / NULL if start failed
 */
PcbPtr startPcb(PcbPtr ps) {
	pid_t pid;

	/* if the process is suspended, restart */
	if(ps->status == PCB_SUSPENDED) {
		if (kill(ps->pid, SIGCONT)) {
       			fprintf(stderr, "Restart failed\n");
        		return NULL;
    		}
		ps->status = PCB_RUNNING;
		return ps;
	}

	/* otherwise, start Pcb */
	switch(pid = fork()) {
		case -1:
			fprintf(stderr, "Starting failed\n");
			return NULL;
			break;
		case 0:			// in child(new) process
			ps->pid = getpid();
			ps->status = PCB_RUNNING;
			printPcb(ps);
			execvp(ps->args[0], ps->args);
			break;
		default:		// in parent
			ps->pid = pid;
			kill(ps->pid, SIGCONT);
			ps->status = PCB_RUNNING;
			break;	
	}
	
	return ps;
}

/**
 * Suspend a process
 * @return: PcbPtr of the process / NULL if failed
 */
PcbPtr suspendPcb(PcbPtr ps) {
	int status;
	if(kill(ps->pid, SIGTSTP)) {
		fprintf(stderr, "Suspension failed(pid: %d)\n", ps->pid);
		return NULL;
	}
	ps->status = PCB_SUSPENDED;
	waitpid(ps->pid, &status, WUNTRACED);
	
	return ps;	
} 

/**
 * Terminate a process
 * @return: PcbPtr of the process / NULL if failed
 */
PcbPtr terminatePcb(PcbPtr ps) {
	int status;
	if(kill(ps->pid, SIGINT)) {
		fprintf(stderr, "Termination failed(pid: %d)\n", ps->pid);
		return NULL;
	}
	ps->status = PCB_TERMINATED;
	waitpid(ps->pid, &status, WUNTRACED);
	
	return ps;
}

/**
 * Create an inactive Pcb
 * @return: PcbPtr of newly initialised Pcb / NULL if malloc failed
 */
PcbPtr createnullPcb() {
	PcbPtr new;
	if( (new = malloc(sizeof(Pcb))) ) {
		new->args[0] = "./process";
		new->args[1] = NULL;	

		new->arrivalTime = 0;
		new->priority = 0;
		new->remainingCpuTime = 0;
		new->memNeed = 0;
		new->io.printer = 0;
		new->io.scanner = 0;
		new->io.modem = 0;
		new->io.cd = 0;

		new->mab = NULL;	
		new->next = NULL;
		new->status = PCB_INITIALISED;
	
		return new;
	} else {
		fprintf(stderr, "Creation failed\n");
		return NULL;
	}
}

/**
 * Enqueue process - enqueue a process at "tail" of the queue
 * @return: head of the queue (PcbPtr)   
 */
PcbPtr enqPcb (PcbPtr head, PcbPtr ps) {
	if (head == NULL) {
		head = ps;
	} else {
		PcbPtr current;
		current = head;
		while (current->next) 			// traverse the list until the end
			current = current->next;
		current->next = ps;			// enqueues the process at "tail"
	}
   
	return head;
}
  
/**
 * Dequeue process - take Pcb from "head" of queue.
 * @return: PcbPtr of dequeued Pcb / NULL if queue was empty
 */
PcbPtr deqPcb (PcbPtr *head) {
	if(!head) {
		fprintf(stderr, "No more process left\n");
		return NULL;
	}
		
	PcbPtr tmp = *head;
	*head = (*head)->next;
	tmp->next = NULL;
	return tmp;
}



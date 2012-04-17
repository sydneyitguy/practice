/**
 * Hypothetical Operating System Testbed (HOST) Dispatcher Shell 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#include "hostd.h"

/**
 * Print error and exit 
 */
void error(char msg[MAX_BUFFER]) {
	fprintf(stderr, "%s.\n", msg);
	exit(1);
}

/**
 * Read job dispatch list from the file 
 */
void readFile(char *fileName) {
	int counter = 0;
	FILE *fp;

	if ( (fp = freopen(fileName, "r", stdin)) ) {
		char buffer[MAX_BUFFER];
		PcbPtr ps;
		
		while (!feof(fp) && counter <= 1000) {		// up to maximum 1000 jobs
			if (fgets(buffer, MAX_BUFFER, fp)) {
				ps = createnullPcb();
				
				/* initialize Pcb */
				ps->arrivalTime		= atoi(strtok(buffer, DELIMITER));
				ps->priority		= atoi(strtok(NULL, DELIMITER));
				ps->remainingCpuTime	= atoi(strtok(NULL, DELIMITER));
				ps->memNeed		= atoi(strtok(NULL, DELIMITER));
				ps->io.printer	 	= atoi(strtok(NULL, DELIMITER));
				ps->io.scanner		= atoi(strtok(NULL, DELIMITER));
				ps->io.modem		= atoi(strtok(NULL, DELIMITER));
				ps->io.cd		= atoi(strtok(NULL, DELIMITER));
				
				inputQ = enqPcb(inputQ, ps);
			}
			counter++;
		}
	} else {
		error("Job dispatch list file is not found\n");
	}
}

/**
 * Check whther the Pcb requires excessive resources
 * @return: return 0 if valid, otherwise return corresponding error code 
 */
int validateJob(PcbPtr ps) {
	/* if the process requires excessive memory space (more than maximum) */
	if((ps->priority == 0 && ps->memNeed > MAX_MEMORY_REALTIME)
	    || ps->memNeed > MAX_MEMORY - MAX_MEMORY_REALTIME) {
		return ERROR_MEM;
	}

	/* if the process requires excessive i/o resources (more than maximum) */
	if((ps->priority == 0 && (ps->io.printer || ps->io.scanner || ps->io.modem || ps->io.cd)) 
	    || ps->io.printer > MAX_PRINTER || ps->io.scanner > MAX_SCANNER
	    || ps->io.modem > MAX_MODEM || ps->io.cd > MAX_CD) {
		return ERROR_IO;
	}

	return 0;
}

/**
 * Dequeue input queue, put into realtime / userjob queue 
 */
void deqInputQ() {
	int validate;
	PcbPtr ps;

	while(inputQ && inputQ->arrivalTime <= cpuTimer) {
		ps = deqPcb(&inputQ);

		/* exception handling */
		if((validate = validateJob(ps)) != 0) {
			printPcbInput(ps);
			if(validate == ERROR_MEM)
				printf("Job is demanding too much memory - deleted\n");
			if(validate == ERROR_IO)
				printf("Job is demanding too many i/o resources - deleted\n");

			free(ps);
			ps = NULL;
		} else {

			if(ps->priority == 0) {		// priority == 0 -> real time queue
				ps->mab = memAlloc(realTimeMemory, MAX_MEMORY_REALTIME);
				realTimeQ = enqPcb(realTimeQ, ps);
			} else {			// priority > 0 -> user job queue
				userJobQ = enqPcb(userJobQ, ps);
			}
		}
	}
}

/**
 * Dequeue userjob queue, put into priority queues
 */
void deqUserJobQ() {
	PcbPtr ps;
	MabPtr mem;
	
	/* while head of userJobQ can be allocated on memory and resources available
	   If the process is invalid (requires more than maximum of memory or i/o),
	   it should also be enqueued to ensure it is terminate on starting time */
	while(userJobQ && (mem = memChk(memory, userJobQ->memNeed)) && rsrcChk(userJobQ)) {
		ps = deqPcb(&userJobQ);

		/* allocate memory block */
		ps->mab = memAlloc(mem, ps->memNeed);
		
		/* allocate I/O resource */
		rsrcAlloc(ps);
		
		/* enqueue on appropriate feedback queue */	
		switch(ps->priority) {
			case 1:
				priorityQ_1 = enqPcb(priorityQ_1, ps);
				break;
			case 2:
				priorityQ_2 = enqPcb(priorityQ_2, ps);
				break;
			case 3:
				priorityQ_3 = enqPcb(priorityQ_3, ps);
				break;
			default:
				error("Process priority level should be between 1 to 3");
				break;
		}	
	}
}

/**
 *  Initialise state 
 */
void initialise() {
	cpuTimer = 0;

	/* dispatcher queues */
	inputQ = userJobQ = NULL;
	realTimeQ = priorityQ_1 = priorityQ_2 = priorityQ_3 = NULL;

	/* memory */
	realTimeMemory = memInitialise(0, MAX_MEMORY_REALTIME);
	memory = memInitialise(MAX_MEMORY_REALTIME, MAX_MEMORY - MAX_MEMORY_REALTIME);

	/* i/o resources */
	io.printer = MAX_PRINTER;
	io.scanner = MAX_SCANNER;
	io.modem = MAX_MODEM;
	io.cd = MAX_CD;
}

/**
 *  Main function
 */
int main(int argc, char **argv) {
	PcbPtr curPs = NULL, tmp;
	initialise();

	/* read job dispatch list from the file */
	if(argc != 2)
		error("Error: <file> argument missing or incorrect");
	readFile(argv[1]);
	
	
	/* while there's currently running process or anything in queues */
	while(curPs || inputQ || userJobQ || realTimeQ || priorityQ_1 || priorityQ_2 || priorityQ_3) {
		deqInputQ();
		deqUserJobQ();

		/* if there is a currently running process */
		if(curPs) {
			curPs->remainingCpuTime -= TIME_QUANTUM;	// decrement process remaining time
			
			/* if time's up */
			if(curPs->remainingCpuTime <= 0) {
				/* terminate process */
				curPs = terminatePcb(curPs);

				/* free memory */
				if(curPs->priority == 0)
					curPs->mab->allocated = 0;
				else
					memFree(curPs->mab);
	
				/* free resource */
				rsrcFree(curPs);
	
				free(curPs);
				curPs = NULL;
			}

			/* if user process and there's any process are waiting */
			else if(curPs->priority > 0 && (realTimeQ || priorityQ_1 || priorityQ_2 || priorityQ_3) ) {
				curPs = suspendPcb(curPs);
				
				/* decrease priority, and enqueue on appropriate queue */
				switch(curPs->priority) {
					case 1:
						priorityQ_2 = enqPcb(priorityQ_2, curPs);
						break;
					default:
						priorityQ_3 = enqPcb(priorityQ_3, curPs);
						break;
				}
				if(curPs->priority < 3)
					curPs->priority++;

				curPs = NULL;
			}

		}

		/* if no currently running process */
		if(!curPs) {
			/* dequeue a highest priority process */
			tmp = NULL;
			if(realTimeQ)
				tmp = deqPcb(&realTimeQ);
			else if(priorityQ_1)
				tmp = deqPcb(&priorityQ_1);
			else if(priorityQ_2)
				tmp = deqPcb(&priorityQ_2);
			else if(priorityQ_3)
				tmp = deqPcb(&priorityQ_3);

			/* if there's anything in dispatch queues */
			if(tmp != NULL) {
				curPs = tmp;
				curPs = startPcb(curPs);	 // start or restart 
			}
		}
		
		struct timespec req, rem;
		req.tv_sec = TIME_QUANTUM;
		req.tv_nsec = 0; 
		nanosleep(&req, &rem);
		cpuTimer += TIME_QUANTUM;
	}
	
	/* free memory */
	realTimeMemory = memFree(realTimeMemory);
	memory = memFree(memory);

	return 0;
}


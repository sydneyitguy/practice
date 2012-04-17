/**
 * MyShell
 * Operating Systems Internal - Assignment 1
 * @author: Sebastian Kim
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <string.h>
#include <signal.h>
#include "myshell.h"
 
#define MAX_BUFFER 1024				// max line buffer
#define MAX_FILENAME 256			// max number of chars of file name
#define MAX_ARGS 64				// max number of args
#define SEPARATORS " \t\n"			// token sparators

extern char **environ;
char lineInput[MAX_BUFFER];			// line buffer
char * args[MAX_ARGS];				// pointers to arg strings
char ** arg;					// working pointer thru args
int argn;					// number of args
char startPath[MAX_BUFFER];			// start path
char path[MAX_BUFFER];				// current path
char shellPath[MAX_BUFFER];			// shell path

/* Variables regarding to i/o redirection */
char redirectFile[3][MAX_FILENAME]; 		// filename: index 0 => append, 1 => write, 2 => read
char redirectFlag[3];				// simple boolean to check what actions should be tacken 
char *redirectChars[3] = { ">>", ">",  "<" };	// redirection symboles

/* Main function */
int main (int argc, char ** argv) {
	signal(SIGINT, SIG_IGN); 			// ignore ctrl + c (SIGINT)
	
	getcwd(startPath, MAX_BUFFER-1);		// set start path
	strcpy(shellPath, startPath);
	strcat(shellPath, "/myshell");			// set shell path
	setenv("SHELL", shellPath, 1);			// set environment
	
	/* Batch file handling */
	if(argc > 2) {					// only one batchfile can be read
		error("Maximum 1 argument allowed: a batch file name");
	} else if(argc == 2) {
		readBatchFile(argv[1]);			// execute the batchfile
	}
		
	while (!feof(stdin)) { 				// keep reading input until "quit" command or eof of redirected input
		updatePath();
		printf("%s$ ",path);				// write prompt
		
		if (fgets (lineInput, MAX_BUFFER, stdin )) {		// read a line
			
			tokenize(); 					// tokenize input
			
			int run_in_background = 0;			// default: run in foreground
			if(argn > 1 && !strcmp(args[argn - 1], "&")) {	// if & characters in the last argument: run in foreground
				args[argn-1] = (char*)0;			// remove '&' from the inputLine
				run_in_background = 1;
			}
			
			/* Background execution handling */
			if(run_in_background) {				// background execution
				switch(fork()) {
					case -1:
						error("fork error");
						break;
					case 0: 				// execution in child process
						setenv("PARENT", shellPath, 1);
						runCommand();
						exit(0);			// quit the child process
						break;
				}
			} else {					// foreground execution
				runCommand();
			}
		}
	}
	return 0; 
}


/* Print error and exit */
void error(char msg[MAX_BUFFER]) {
	printf("%s.\n", msg);
	exit(1);
}

/* Update current path */
void updatePath() {
	getcwd(path, MAX_BUFFER-1);
}

/* Tokenize the line input */
void tokenize() {
	/* Handle I/O redirection */
	char *tmp, *point;
	int i;
	for(i=0; i<3; i++) {				// 0: append(>>), 1: write(>), 2: read(<)
		redirectFlag[i] = 0;
		
		if((point = strstr(lineInput,redirectChars[i])) != NULL) {	// find the redirect symbol
			tmp = strtok(point+strlen(redirectChars[i]), SEPARATORS);	// get the file name
			strcpy(redirectFile[i],tmp);					// set input or output file name
			redirectFlag[i] = 1;						// flag - on 
			
			*point = '\0';
			if((tmp=strtok(NULL,SEPARATORS)) != NULL) 
				strcat(lineInput,tmp);					// restore the lineInput to get the command
		}
	}
	
	/* Tokenize the lineInput into args array */
	argn = 1;
	arg = args;
	*arg++ = strtok(lineInput,SEPARATORS);   	// tokenize the input
	while ((*arg++ = strtok(NULL,SEPARATORS)))	// last entry will be NULL
		argn++;
}

/* Restore exit signal(ctrl+c) in child process */
void sigChild() {
	signal(SIGINT, SIG_IGN);
	putchar('\n');
}

/* Handle i/o redirection */
void ioRedirect(int readAllowed) {
	if(redirectFlag[0] == 1)			// if flag index 0 on = '>>'
		freopen(redirectFile[0], "a", stdout);		// append stdout into the file 
	if(redirectFlag[1] == 1)			// if flag index 1 on = '>'
		freopen(redirectFile[1], "w", stdout);		// write stdout into the file
	if(redirectFlag[2] == 1 && readAllowed == 1) 	// if flag index 2 on = '<' and read allowed
		freopen(redirectFile[2], "r", stdin);		// read stdin from the file
}

/* Restore output redirection */
void ioRedirectClose() {
	if(redirectFlag[0] || redirectFlag[1])		// if any flag is on
		freopen("/dev/tty","w",stdout);			// restore output to the screen	
}

/* Execute commands */
void runCommand() {
	if (args[0]) {		// if there is any command
		/** Internal commands **/

		/* Clear the screen */
		if (!strcmp(args[0],"clr")) {
			system("clear");
		} 
		
		/* List files and directories */
		else if(!strcmp(args[0],"dir")) {
			ioRedirect(0);				// handle i/o redirection - read not allowed
			
			char tmp[MAX_BUFFER];
			strcpy(tmp, "ls -la ");
			if(args[1])
				strcat(tmp, args[1]);
			system(tmp);				// use external shell command 
			
			ioRedirectClose();			// restore i/o redirection
		}

		/* Print environment */
		else if(!strcmp(args[0],"environ")) {
			ioRedirect(0);				// handle i/o redirection - read not allowed
			char **env = environ;
			while( *env ) {
				printf( "%s\n", *env );
				env++;
			}
			ioRedirectClose();			// restore i/o redirection
		}
		
		/* Change directory */
		else if(!strcmp(args[0], "cd")) {
			if(!args[1]) {				// if <directory> argument is not present
				printf( "%s\n", path );			// print current path
			} else {
				if(!chdir(args[1])) {		// if <directory> changed
					updatePath();			// update current path
					setenv("PWD", path, 1);		// change environment
				} else {			// if <directory> does not exists, print error
					printf("%s: No such file or directory exist\n", args[1]);
				}
			}
		}
		
		/* Repeat the user's input */
		else if(!strcmp(args[0], "echo")) {
			ioRedirect(0);				// handle i/o redirection - read not allowed
			
			char *comment = (char *)malloc(MAX_BUFFER);
			strcpy(comment, "");
			arg = &args[1];
			while(*arg) {				// join all arguments into a string 
				strcat(comment, *arg++);
				strcat(comment, " ");		// multiple spaces and tabs will be reduced to one space
			}
			
			printf("%s\n", comment);		// print the string
			memset(comment, 0, MAX_BUFFER);		// clear buffer
			free(comment);

			ioRedirectClose();			// restore i/o redirection
		}
		
		/* Print the user manual */
		else if(!strcmp(args[0], "help")) {
			ioRedirect(1);				// handle i/o redirection - read not allowed
			
			char tmp[MAX_BUFFER];
			strcpy(tmp, "more ");
			strcat(tmp, startPath);
			strcat(tmp, "/readme");			// Generate system command with absolute path of readme file
			system(tmp);
			putchar('\n');
			
			ioRedirectClose();			// restore i/o redirection
		}
		
		/* Wait until user inputs Enter */
		else if(!strcmp(args[0], "pause")) {
			getpass("Press Enter to continue\n");	// use getpass function to disable screen output
		}
		
		/* Exit the shell */
		else if (!strcmp(args[0],"quit"))
			exit(0);
		
		/** External commands **/
		else {					// if there are no keyword matching, pass command onto OS 
			int status;
			pid_t pid;
			signal(SIGINT, sigChild); 		// quit child process by signal SIGINT (ctrl + c)
			
			switch(pid = fork()) {
				case -1:
					error("fork error");
					break;
				case 0: 				// execution in child process
					setenv("PARENT", shellPath, 1);
					ioRedirect(1);				// handle i/o redirection - read allowed
					
					if(execvp(args[0],args) == -1)		// execute the command
						error("command not found");
					
					exit(1); 				// can never reached here - exit with fault signal
					break;
			}
			fflush(stdout);
			waitpid(pid, &status, 0);		// wait until the child proccess finish
		}
	}
}

/* Read batch file and execute the command inside it */
void readBatchFile(char filename[MAX_FILENAME]) {
	FILE *fp;
	int lineNo = 1;
	
	fp = fopen(filename, "r");			// open the batch file
	if(fp == NULL)
		error("Batch file does not exists");
	
	while (fgets (lineInput, MAX_BUFFER, fp )) {	// read a line
		printf("%d. %s", lineNo++, lineInput);		// print the command number
		tokenize();					// tokenize the line
		runCommand();					// run command
		putchar('\n');
	}

	fclose(fp);					// close the file
	exit(0);					// exit when at the end of the file
}

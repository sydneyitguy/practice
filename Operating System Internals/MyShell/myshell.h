/**
 * MyShell
 * Operating Systems Internal - Assignment 1
 * @author: Sebastian Kim
 */
 
void error(char*);	/* Print error and exit */
void updatePath();	/* Update current path */
void tokenize();	/* Tokenize the line input */
void sigChild();	/* Restore exit signal(ctrl+c) in child process */
void ioRedirect(int);	/* Handle i/o redirection */
void ioRedirectClose();	/* Restore output redirection */
void runCommand(); 	/* Execute commands */
void readBatchFile();	/* Read batch file and execute the command inside it */

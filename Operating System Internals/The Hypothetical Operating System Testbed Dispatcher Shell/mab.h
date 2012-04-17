/**
 * Memory Allocation Block (MAB) 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#ifndef MAB_H
#define MAB_H

#include <stdio.h>
#include <stdlib.h>

typedef struct mab {
    int offset;
    int size;
    int allocated;		// flag 0 or 1
    struct mab * next;
    struct mab * prev;
} Mab;
typedef Mab * MabPtr; 

/* Initialise a memory block */
MabPtr memInitialise(int offset, int size);

/* Check if memory available */
MabPtr memChk(MabPtr m, int size);

/* Merge two memory blocks */
MabPtr memMerge(MabPtr m);

/* Free memory block */
MabPtr memFree(MabPtr m);

/* Split a memory block */
MabPtr memSplit(MabPtr m, int size);

/* Allocate memory block */
MabPtr memAlloc(MabPtr m, int size);

#endif

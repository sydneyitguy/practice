/**
 * Memory Allocation Block (MAB) 
 * Operating Systems Internal - Assignment 2
 * @author: Sebastian Kim
 */

#include "mab.h"

/* Initialise a memory block */
MabPtr memInitialise(int offset, int size) {
	MabPtr m = malloc(sizeof(Mab));
	m->offset = offset;
	m->size = size;
	m->allocated = 0;
	m->next = m->prev = NULL;
	
	return m;
}

/* Check if memory available */
MabPtr memChk(MabPtr m, int size) {
	while(m) {
		if(size <= m->size && !m->allocated)	// search until there's enough space
			return m;
		m = m->next; 
	}
	return NULL;	
}

/* Merge two memory blocks */
MabPtr memMerge(MabPtr m) {
	MabPtr left = m->prev, right = m->next, tmp;

	if(left && left->allocated == 0) {		// merge left if left is not allocated
		tmp = m;
		m = left;
		m->size += tmp->size;
		if((m->next = tmp->next))		// fix links
			(m->next)->prev = m;
		free(tmp);
		tmp = NULL;	
	}
	
	if(right && right->allocated == 0) {		// merge right if right is not allocated
		tmp = right;
		m->size += tmp->size;
		if((m->next = tmp->next))		// fix links
			(m->next)->prev = m;
		free(tmp);
		tmp = NULL;
		return m;
	}

	return m;
}

/* Free memory block */
MabPtr memFree(MabPtr m) {
	if(!m)				// if already free
		return NULL;
	
	if(!m->prev && !m->next) {	// if memory block is not linked both prev and next 
		free(m);
		m = NULL;
	} else {
		m->allocated = 0;		// free memory blck
		m = memMerge(m);		// merge with adjacent blocks	
	}

	return m;
}

/**
 * Split a memory block
 * @return: MabPtr of allocated memory block
 */
MabPtr memSplit(MabPtr m, int size) {
	MabPtr right;

	/* if m is NULL, return NULL */
	if(!m)
		return NULL;

	/* right(new) partition will be free, left one will be allocated */ 
	right = memInitialise(m->offset + size, m->size - size);
	m->size = size;
	m->allocated = 1;

	/* rearrange the links */
	right->prev = m;
	if(m->next) {
		right->next = m->next;
		right = memMerge(right);
	}
	m->next = right;
	
	return m;
}

/* Allocate memory block */
MabPtr memAlloc(MabPtr m, int size) {
	/* block size is not enough, error:return NULL */
	if(m->size < size) 
		return NULL;

	/* if the block size is bigger, split the block */
	if(m->size > size)
		m = memSplit(m, size);
	
	m->allocated = 1;
	return m;
}


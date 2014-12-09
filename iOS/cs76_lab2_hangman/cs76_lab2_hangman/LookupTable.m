//
//  LookupTable.m
//  cs76_lab2_hangman
//
//  Created by SEB on 6/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import "LookupTable.h"

@implementation LookupTable

- (LookupTable *) init {
    self = [super init];
    
    // Load words from plist
    NSString *fileWithPath = [[NSBundle mainBundle] pathForResource:@"words" ofType:@"plist"];
    NSMutableArray *words = [[NSMutableArray alloc] initWithContentsOfFile:fileWithPath];
    
    NSLog(@"%d words loaded", [words count]);

    return self;
}

@end

//
//  main.m
//  cs76_lab1
//
//  Created by SEB on 5/01/2014.
//  Copyright (c) 2014 SEB. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Student.h"

int main(int argc, const char * argv[])
{
    
    @autoreleasepool {
        // intialize student
        Student *s = [[Student alloc] init];
        s.birthday = [NSDate dateWithNaturalLanguageString:@"07/30/85"];
        s.year = 2014;
        s.first_name = @"Sebastian";
        s.last_name = @"Kim";
        
        // test invalid major
        s.major = @"Computer Science";
        s.major = @"Finance";
        
        // add grades
        [s addGradeForClass:32999 withGrade:94];
        [s addGradeForClass:32995 withGrade:92];
        
        // test description method (we could also just NSLog 's', which calls [s description])
        NSLog(@"%@", s.description);
        
    }
    return 0;
}

